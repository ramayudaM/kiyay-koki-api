const express = require('express');
const WishlistController = require('../controller/wishlist');
const middlewareVerifyToken = require('../middleware/verifyToken');
const middlewarecheckUserLevel = require('../middleware/checkUserLevel');

const router = express.Router();

router.use(middlewareVerifyToken);
router.get('/get-wishlist/:userId', WishlistController.getWishlistByUserIdAdmin);

router.use(middlewarecheckUserLevel('buyer'));

router.post('/', WishlistController.createWishlist);

router.get('/', WishlistController.getWishlistByUserId);

router.delete('/:id', WishlistController.deleteWishlist);

router.get('/:id', WishlistController.getWishlistByProduct);

module.exports = router;
