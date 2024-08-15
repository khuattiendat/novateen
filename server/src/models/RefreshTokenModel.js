const mongoose = require('mongoose');
const RefreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, 'Please provide a token']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user']
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);