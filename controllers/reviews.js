const mongoose = require('mongoose');
const Review = require('../models/review');
const Upvote = require('../models/upvote');
const Job = require('../models/job');

// Create a new review
module.exports.createReview = async (req, res) => {
    try{
        const job = await Job.findById(req.params.jobId)
        const newReview = new Review(req.body);
        newReview.job = mongoose.Types.ObjectId(req.params.jobId);
        newReview.author = mongoose.Types.ObjectId('6254a747be3e49bd093f8c62'); //req.user._id
        job.reviews.push(newReview);
        await newReview.save();
        await job.save();
        // After saving, the Job average review score is updated
        updateJobAvgScore(req.params.jobId);
        res.send({status:"success", payload: newReview});
    }
    catch(err){
        return res.send({status:"failure", payload: err});
    }
}

// Update a review
module.exports.updateReview = async (req, res) =>{
    try{
        const newReview = await Review.findByIdAndUpdate(req.params.reviewId, {description: req.body.description, score: req.body.score});
        // Job average score is modified ONLY if review score is updated
        if(parseInt(newReview.score) !== parseInt(req.body.score)){
            updateJobAvgScore(req.params.jobId);
        }
        return res.send({status:"success", payload: newReview});
    } catch(err){
        return res.send({status:"failure", payload: err});
    }
};

// Delete a review
module.exports.deleteReview = async (req, res) => {
    try{
        const deletedReview = await Review.findByIdAndDelete(req.params.reviewId);
        // Upvotes associated to the review are deleted as well. Job Average Score is recalculated.
        await updateJobAvgScore(req.params.jobId);
        await Job.updateOne( 
            {_id: req.params.jobId}, 
            { $pull: {reviews: req.params.reviewId } } 
        );
        await Upvote.deleteMany({review: req.params.reviewId});
        return res.send(deletedReview);
    } catch(err){
        return res.send({status:"failure", payload: err});
    }
};

// Upvote a review
module.exports.upvoteReview = async (req, res) => {
    try{
        const checkReview = await Upvote.find({author: req.user._id, review: req.body.reviewId});
        if(checkReview.length === 0){
            const newUpvote = Upvote.new();
            newUpvote.value = req.body.upvoteValue;
            await newUpvote.save();
            const updatedReview = await Review.findByIdAndUpdate(req.params.reviewId, {$inc: {reviewUpvote: req.body.upvoteValue}});
            return res.send({status: "success", payload: updatedReview});
        }
    } catch(err){
        return res.send({status:"failure", payload: err});
    }
}

// Functions for DRY code
updateJobAvgScore = async (jobId) =>{
    const job = await Job.findById(jobId).populate({
        path: 'reviews',
        select: 'score'
    }).exec();
    let newUpvoteAvg = job.reviews.reduce((acc, current) => {
        return acc + current.score;
    }, 0) / job.reviews.length;
    job.reviewAvg = newUpvoteAvg.toFixed(1);
    await job.save();
    return job;
}