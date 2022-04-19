const mongoose = require('mongoose');
const Review = require('../models/review');
const Upvote = require('../models/upvote');

// Create a new review
module.exports.createReview = async (req, res) => {
    const newReview = new Review(...req.body);
    newReview.author = mongoose.Types.ObjectId('6254a747be3e49bd093f8c62'); //req.user._id
    await newReview.save();
    res.send(newReview);
}

// Update a review
module.exports.updateReview = async (req, res) =>{
    const oldReview = await Review.findById(req.body.reviewId);
    // if(oldReview.author === req.user._id){}
    const newReview = await Review.findByIdAndUpdate(req.body.reviewId, {description: req.body.description, score: req.body.score}, {new:true});
    return res.send(newReview);
};

// Delete a review
module.exports.deleteReview = async (req, res) => {
    const oldReview = await Review.findById(req.query.reviewId);
    // if(oldReview.author === req.user._id){}
    const deletedReview = await Review.findByIdAndDelete(req.query.reviewId);
    return res.send(deletedReview);
};

// Upvote a review
module.exports.upvoteReview = async (req, res) => {
    const checkReview = await Upvote.find({author: req.user._id, review: req.query.reviewId});
    // if(checkReview.length === 0){
        const newUpvote = Upvote.new();
        newUpvote.value = req.query.upvoteValue;
        await newUpvote.save();
        const updatedReview = await Review.findByIdAndUpdate(req.query.reviewId, {$inc: {reviewUpvote: req.query.upvoteValue}});
        return res.send(updatedValue);
    // }
}