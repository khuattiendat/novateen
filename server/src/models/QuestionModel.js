const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Please provide a question']
    },
    options: [
        {
            option: {
                type: String,
                required: [true, 'Please provide an option']
            },
            isAnswer: {
                type: Boolean,
                default: false
            }
        }
    ],
}, {
    timestamps: true
});
module.exports = mongoose.model('Question', QuestionSchema);