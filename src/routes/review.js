const express = require('express');
const ReviewController = require('../controller/review');
const middlewareVerifyToken = require('../middleware/verifyToken');
const middlewarecheckUserLevel = require('../middleware/checkUserLevel');

const router = express.Router();

router.use(middlewareVerifyToken);

router.post('/', middlewarecheckUserLevel('buyer'), ReviewController.createReview);

router.get('/product-review', middlewarecheckUserLevel('buyer'), ReviewController.getReviewByProductId);

router.get('/', middlewarecheckUserLevel('buyer'), ReviewController.getReviewByUserId);

router.put('/:id', middlewarecheckUserLevel('buyer'), ReviewController.updateReview);

router.delete('/:id', middlewarecheckUserLevel('buyer'), ReviewController.deleteReview);

module.exports = router;
