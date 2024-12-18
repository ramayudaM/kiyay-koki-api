const express = require('express');
const UserController = require('../controller/users');
const middlewareVerifyToken = require('../middleware/verifyToken');
const middlewarecheckUserLevel = require('../middleware/checkUserLevel');

const router = express.Router();

router.post('/request-otp', UserController.requestOtp);
router.post('/verify-otp', UserController.verifyOtp);

router.use(middlewareVerifyToken);
router.get('/get-all', middlewarecheckUserLevel('seller'), UserController.getAllUser);
router.delete('/delete-user/:id', middlewarecheckUserLevel('seller'), UserController.deleteUser);

module.exports = router;
