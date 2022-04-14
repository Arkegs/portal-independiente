const mongoose = require('moongoose');
const Review = require('../models/review');

// Create a new review
module.exports.createReview = async (req, res) => {
    const newReview = new Review(...req.body);
    newReview.author = mongoose.Types.ObjectId('6254a747be3e49bd093f8c62'); //req.user._id
    await newReview.save();
    res.send(newReview);
}

// Update a review

// Delete a review

// Upvote a review

module.exports.reviewAction = (req, res) => {
    return res.send("El review duro");
}