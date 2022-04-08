const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
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

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);