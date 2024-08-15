const mongoose = require('mongoose');
const ExamUserSchema = new mongoose.Schema({
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    answers:
        {
            correctAnswer: {
                type: [mongoose.Schema.Types.ObjectId],
                ref: 'Question'
            },
            wrongAnswer: {
                type: [mongoose.Schema.Types.ObjectId],
                ref: 'Question'
            }
        },
    score: {
        type: Number
    },
    time: {
        type: String
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('ExamUser', ExamUserSchema);