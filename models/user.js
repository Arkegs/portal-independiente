const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Job = require('./job');
const Review = require('./review');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    phone: String,
    whatsapp: String,
    facebook: String,
    linkedin: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    birthdate:{
        type: Date,
        required: true
    },
    jobs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Job'
        }
    ],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    banned:{
        type: Number,
        default: 0
    },
    status:{
        type: String, 
        enum: ['active','unconfirmed', 'banned'],
        default: 'unconfirmed'
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
}, 
{
    timestamps: { createdAt: true, updatedAt: false }
});

UserSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Job.remove({
            _id: {
                $in: doc.jobs
            }
        });
        await Review.remove({
            _id: {
                $in: doc.reviews
            }
        })
    }
});


UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);