const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Job = require('./job');
const User = require('./review');
const Schema = mongoose.Schema;

const ReviewSchema = Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    job:{
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
    reviewUpvote: {
        type: Number,
        default: 0
    }
}, 
{
    timestamps: { createdAt: true, updatedAt: false }
});

ReviewSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Review', ReviewSchema);