const express = require('express');
const UserController = require('../controller/users');

const router = express.Router();

router.post('/request-otp', UserController.requestOtp);
router.post('/verify-otp', UserController.verifyOtp);

module.exports = router;
