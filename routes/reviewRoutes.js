const express = require('express');
const router = express.Router();
const reviews = require('../controllers/reviews');

// Review routes
router.route('/')
    .post(reviews.createReview);

router.route('/:reviewId')
    .delete(reviews.deleteReview)
    .put(reviews.updateReview)
    .patch(reviews.upvoteReview);

module.exports = router;
