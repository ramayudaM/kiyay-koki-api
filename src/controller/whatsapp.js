const fs = require('fs');
const path = require('path');
const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
} = require('@whiskeysockets/baileys');
const qrcode = require('qrcode');
const { sendError } = require('../utils/sendResponse');

// Variabel global untuk koneksi WhatsApp
let globalSock;
let isConnected = false;

const connectToWhatsApp = async () => {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

  const sock = makeWASocket({
    printQRInTerminal: true,
    browser: ['ubuntu', 'chrome'],
    auth: state,
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
    if (connection === 'open') {
      console.log('Connection active');
      isConnected = true;
    } else if (connection === 'close') {
      console.log('Connection closed');
      isConnected = false;

      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut; // Tidak reconnect jika logged out

      if (shouldReconnect) {
        console.log('Retrying connection...');
        connectToWhatsApp();
      } else {
        console.error('Logged out. Manual reconnection needed.');
      }
    }
  });

  globalSock = sock;
  return sock;
};

const getWhatsAppSocket = async () => {
  if (isConnected && globalSock) {
    return globalSock;
  }
  return connectToWhatsApp();
};

const updateSenderNumber = async (req, res) => {
  try {
    const authFolderPath = path.resolve(__dirname, '../../auth_info_baileys');
    await fs.promises.rm(authFolderPath, { recursive: true, force: true });

    const sock = await connectToWhatsApp();

    const listener = async ({ qr }) => {
      if (qr) {
        // Simpan QR Code ke file dan kirim sebagai respons
        const qrImagePath = path.resolve(__dirname, '../config/qr-code.png');
        await qrcode.toFile(qrImagePath, qr);
        return res.sendFile(qrImagePath);
      }
    };

    sock.ev.on('connection.update', listener);
  } catch (error) {
    console.error(`Failed to update sender number: ${error.message}`);
    sendError(res, error);
  }
};

// API untuk mendapatkan nomor pengirim yang saat ini aktif
// const getCurrentSenderNumber = (req, res) => {
//   try {
//     const senderNumber = getSenderNumber();
//     if (!senderNumber) {
//       return res.status(404).json({ message: 'No sender number is configured.' });
//     }
//     res.status(200).json({ senderNumber });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const sendOtpToWhatsApp = async (waNumber, otpCode) => {
  try {
    const sock = await getWhatsAppSocket();

    const message = `Your OTP code is: ${otpCode}. It will expire in 2 minutes.`;
    const recipient = `${waNumber}@s.whatsapp.net`;
    await sock.sendMessage(recipient, { text: message });

    console.log(`OTP sent successfully to ${waNumber}`);
  } catch (error) {
    console.error(`Failed to send OTP: ${error.message}`);
    sendError(res, error);
  }
};

module.exports = {
  connectToWhatsApp,
  updateSenderNumber,
  sendOtpToWhatsApp,
};
