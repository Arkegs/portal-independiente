const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UpvoteSchema = Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    review: {
        type: Schema.Types.ObjectId,
        ref: 'Review',
        required: true
    },
    value: Number
});

module.exports = mongoose.model('Upvote', UpvoteSchema);