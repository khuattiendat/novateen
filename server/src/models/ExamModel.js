const mongoose = require('mongoose');
const ExamSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title']
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    startTime: {
        type: String,
        required: [true, 'Please provide a start time']
    },
    endTime: {
        type: String,
        required: [true, 'Please provide an end time']
    },
    date: {
        type: String,
        required: [true, 'Please provide a date']
    },
    description: {
        type: String,
    },
    number_of_question: {
        type: Number,
        required: [true, 'Please provide number of questions']
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
            required: [true, 'Please provide questions']
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Exam', ExamSchema);