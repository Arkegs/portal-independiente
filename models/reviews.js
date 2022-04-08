const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewedJob: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    reviewVote: Number
});

module.exports = mongoose.model('Review', ReviewSchema);