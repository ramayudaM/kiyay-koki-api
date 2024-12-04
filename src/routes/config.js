const express = require('express');
const { updateSenderNumber } = require('../controller/whatsapp');
const { generateApiKey } = require('../controller/security');
const { createUserSeller } = require('../controller/users');

const middlewareVerifyToken = require('../middleware/verifyToken');
const middlewarecheckUserLevel = require('../middleware/checkUserLevel');

const router = express.Router();

router.use(middlewareVerifyToken);

// Endpoint untuk memperbarui nomor pengirim dan menghasilkan QR code
router.post('/update-sender', middlewarecheckUserLevel('seller'), updateSenderNumber);
router.post('/generate', middlewarecheckUserLevel('seller'), generateApiKey);
router.post('/add-seller', middlewarecheckUserLevel('seller'), createUserSeller);
// Endpoint untuk mendapatkan nomor pengirim yang aktif
// router.get('/current-sender', getCurrentSenderNumber);

module.exports = router;
