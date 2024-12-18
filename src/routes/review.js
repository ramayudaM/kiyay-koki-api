const express = require('express');
const ReviewController = require('../controller/review');
const middlewareVerifyToken = require('../middleware/verifyToken');
const middlewarecheckUserLevel = require('../middleware/checkUserLevel');

const router = express.Router();

router.use(middlewareVerifyToken);

router.post('/', middlewarecheckUserLevel('buyer'), ReviewController.createReview);

router.get('/:id', middlewarecheckUserLevel('buyer'), ReviewController.getReviewByUserId);

router.get('/product-review/:id', middlewarecheckUserLevel('buyer'), ReviewController.getReviewByProductId);

router.put('/:id', middlewarecheckUserLevel('buyer'), ReviewController.updateReview);

router.delete('/:id', middlewarecheckUserLevel('buyer'), ReviewController.deleteReview);

module.exports = router;
