const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    role: {
        type: String,
        enum: ['student', 'teacher'],
        default: 'student',
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
        unique: true
    },
    dateOfBirth: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('User', UserSchema);
