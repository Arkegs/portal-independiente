const express = require('express');
const router = express.Router();
const reviews = require('../controllers/reviews');

// Review routes
router.route('/')
    .get(reviews.reviewAction)
    .post(reviews.reviewAction);

router.route('/:reviewId')
    .delete(reviews.reviewAction)
    .put(reviews.reviewAction);

module.exports = router;
