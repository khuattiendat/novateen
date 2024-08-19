const ExamUserModel = require('../models/ExamUserModel');
const ExamModel = require('../models/ExamModel');
const addExamUser = async (data) => {
    try {
        let correctAnswer = [];
        let wrongAnswer = [];
        // data test
        const exam = await ExamModel.findById(data?.exam)
            .populate({
                path: 'questions',
                select: 'question options' // only include 'question' and 'options.option'
            })

        let questions = await exam?.questions;
        let userAnswers = data?.userAnswers

        if (questions) {
            questions.map((question) => {
                let question_id = question._id;
                // list id dap an cau dung
                let option_id = question?.options.find(option => option.isAnswer === true)._id;
                // list cau tra loi cua user
                let userAnswer = userAnswers.find(answer => answer.question_id.toString() === question_id.toString());
                if (userAnswer && userAnswer?.option_id.toString() === option_id.toString()) {
                    console.log('correct')
                    correctAnswer.push({
                        question_id,
                        option_id: userAnswer?.option_id
                    });
                } else {
                    wrongAnswer.push({
                        question_id,
                        option_id: userAnswer?.option_id
                    });
                }
            });
        }
        const score = (correctAnswer.length / questions.length) * 100;

        let payload = {
            exam: data?.exam,
            user: data?.user,
            answers: {
                selectedAnswer: correctAnswer.concat(wrongAnswer),
                correctAnswer,
                wrongAnswer
            },
            score: score.toFixed(1),
            time: data?.time
        }
        console.log(payload)

        const examUser = new ExamUserModel(payload);
        const result = await examUser.save();
        return {
            data: result,
            error: false,
            message: 'ExamUser added successfully'
        }

    } catch
        (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }

}
const getRating = async (examId) => {
    try {
        console.log(examId)
        const result = await ExamUserModel.find({exam: examId})
            .populate('user')
            .populate('exam')
            .sort({score: -1, time: 1});
        if (!result.length) {
            return {
                data: null,
                error: true,
                message: 'ExamUser not found'
            }
        }
        return {
            data: result,
            error: false,
            message: 'ExamUser fetched successfully'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }

}
const getExamUserByUserId = async (userId, examId) => {
    try {
        const result = await ExamUserModel.find({user: userId, exam: examId})
        return {
            data: result,
            error: false,
            message: 'ExamUser fetched successfully'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
module.exports = {
    addExamUser,
    getRating,
    getExamUserByUserId
}