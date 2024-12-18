const express = require('express');
const CartController = require('../controller/cart');
const middlewareVerifyToken = require('../middleware/verifyToken');
const middlewarecheckUserLevel = require('../middleware/checkUserLevel');

const router = express.Router();

router.use(middlewareVerifyToken);

router.get('/get-cart/:userId', CartController.getCartByUserIdAdmin);

router.use(middlewarecheckUserLevel('buyer'));

router.post('/', CartController.createCart);

router.get('/', CartController.getCartByUserId);

router.put('/:id', CartController.updateCart);

router.delete('/:id', CartController.deleteCart);

router.get('/:id', CartController.getCartByProduct);

module.exports = router;
