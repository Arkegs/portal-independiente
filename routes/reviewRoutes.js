const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews');
const { isLoggedIn } = require('../middleware');

// Review routes
router.route('/')
    .post(isLoggedIn, reviews.createReview);

router.route('/:reviewId')
    .delete(isLoggedIn, reviews.deleteReview)
    .put(isLoggedIn, reviews.updateReview)
    .patch(isLoggedIn, reviews.upvoteReview);

module.exports = router;
