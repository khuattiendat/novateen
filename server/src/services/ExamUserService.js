const ExamUserModel = require('../models/ExamUserModel');
const addExamUser = async (data) => {
    try {
        const examUser = new ExamUserModel(data?.data);
        const result = await examUser.save();
        return {
            data: result,
            error: false,
            message: 'ExamUser added successfully'
        }

    } catch (error) {
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
            .sort('-score');
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