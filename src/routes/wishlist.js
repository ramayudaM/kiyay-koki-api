const express = require('express');
const WishlistController = require('../controller/wishlist');
const middlewareVerifyToken = require('../middleware/verifyToken');
const middlewarecheckUserLevel = require('../middleware/checkUserLevel');

const router = express.Router();

router.use(middlewareVerifyToken);
router.use(middlewarecheckUserLevel('buyer'));

router.post('/', WishlistController.createWishlist);

router.get('/', WishlistController.getWishlistByUserId);

router.delete('/:id', WishlistController.deleteWishlist);

module.exports = router;
