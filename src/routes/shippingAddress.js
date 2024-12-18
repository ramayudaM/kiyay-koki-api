const express = require('express');
const ShippingAddressController = require('../controller/shippingAddress');
const middlewareVerifyToken = require('../middleware/verifyToken');
const middlewarecheckUserLevel = require('../middleware/checkUserLevel');

const router = express.Router();

router.use(middlewareVerifyToken);

router.get('/seller/:id', middlewarecheckUserLevel('seller'), ShippingAddressController.sellerGetShippingAddress);

router.post('/', middlewarecheckUserLevel('buyer'), ShippingAddressController.createShippingAddress);

router.get('/', middlewarecheckUserLevel('buyer'), ShippingAddressController.getShippingAddressByUserId);

router.put('/:id', middlewarecheckUserLevel('buyer'), ShippingAddressController.updateShippingAddress);

router.delete('/:id', middlewarecheckUserLevel('buyer'), ShippingAddressController.deleteShippingAddress);

router.get('/:id', middlewarecheckUserLevel('buyer'), ShippingAddressController.getShippingAddressById);

module.exports = router;
