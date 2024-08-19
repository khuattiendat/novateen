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
            selectedAnswer: [
                {
                    question_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Question'
                    },
                    option_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Option'
                    }
                }
            ],
            correctAnswer: [
                {
                    question_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Question'
                    },
                    option_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Option'
                    }
                }
            ],
            wrongAnswer: [
                {
                    question_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Question'
                    },
                    option_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Option'
                    }
                }
            ]
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