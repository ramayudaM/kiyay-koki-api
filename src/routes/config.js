const express = require('express');
const WhatsAppController = require('../controller/whatsapp');
const SecurityController = require('../controller/security');
const UserController = require('../controller/users');

const middlewareVerifyToken = require('../middleware/verifyToken');
const middlewarecheckUserLevel = require('../middleware/checkUserLevel');

const router = express.Router();

router.use(middlewareVerifyToken);

router.post('/update-sender', middlewarecheckUserLevel('seller'), WhatsAppController.updateSenderNumber);
router.post('/generate', middlewarecheckUserLevel('seller'), SecurityController.generateApiKey);
router.post('/add-seller', middlewarecheckUserLevel('seller'), UserController.createUserSeller);

module.exports = router;
