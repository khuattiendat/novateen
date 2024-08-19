const ExamModel = require('../models/ExamModel');
const {getQuestionLimit, checkCountQuestion} = require("./QuestionService");
const addExam = async (data) => {
    try {
        const {
            title,
            startTime,
            members,
            endTime,
            date,
            description,
            time_announce_result,
            number_of_question,
            createdBy
        } = data;
        if (!title) {
            return {
                data: null,
                error: true,
                message: 'Please provide a title'
            }
        }
        if (!startTime) {
            return {
                data: null,
                error: true,
                message: 'Please provide a start time'
            }
        }
        if (!endTime) {
            return {
                data: null,
                error: true,
                message: 'Please provide an end time'
            }
        }
        if (!date) {
            return {
                data: null,
                error: true,
                message: 'Please provide a date'
            }
        }
        if (!number_of_question) {
            return {
                data: null,
                error: true,
                message: 'Please provide number of questions'
            }
        }
        if (!time_announce_result) {
            return {
                data: null,
                error: true,
                message: 'Please provide a time to announce result'
            }
        }
        if (!createdBy) {
            return {
                data: null,
                error: true,
                message: 'Please provide a user'
            }
        }
        const checkQuestion = await checkCountQuestion();
        if (checkQuestion.data < number_of_question) {
            return {
                data: null,
                error: true,
                message: 'Number of questions is greater than available questions'
            }
        }
        const questions = await getQuestionLimit(number_of_question);
        const newExam = new ExamModel({
            title,
            startTime,
            members,
            endTime,
            date,
            description,
            time_announce_result,
            number_of_question,
            questions: questions?.data,
            createdBy
        });
        await newExam.save();
        return {
            data: newExam,
            error: false,
            message: 'Exam added successfully'
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
const getAllExam = async () => {
    try {
        const exams = await ExamModel.find({}).populate('questions').populate('members');
        return {
            data: exams,
            error: false,
            message: 'Exams fetched successfully'
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
const getComingExam = async () => {
    try {
        const exams = await ExamModel.find({}).populate('questions').populate('members');
        const examsData = [];
        const date = new Date().getTime();
        if (exams) {
            exams?.forEach(exam => {
                let examDate = new Date(`${exam.date} ${exam.endTime}`).getTime();
                if (examDate > date) {
                    examsData.push(exam);
                }
            })
        }
        return {
            data: examsData,
            error: false,
            message: 'Exams fetched successfully'

        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }

    }
}
const getExamById = async (examId) => {
    try {
        const exam = await ExamModel.findById(examId)
            .populate({
                path: 'questions',
                select: 'question options.option options._id' // only include 'question' and 'options.option'
            })
            .populate('members');
        if (!exam) {
            return {
                data: null,
                error: true,
                message: 'Exam not found'
            }
        }
        return {
            data: exam,
            error: false,
            message: 'Exam fetched successfully'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
const getExamByIdFull = async (examId) => {
    try {
        const exam = await ExamModel.findById(examId)
            .populate('questions')
            .populate('members');
        if (!exam) {
            return {
                data: null,
                error: true,
                message: 'Exam not found'
            }
        }
        return {
            data: exam,
            error: false,
            message: 'Exam fetched successfully'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
const updateMemberExam = async (examId, userId) => {
    try {
        const exam = await ExamModel.findById(examId);
        if (!exam) {
            return {
                data: null,
                error: true,
                message: 'Exam not found'
            }
        }
        if (exam.members.includes(userId)) {
            return {
                data: null,
                error: false,
                message: 'User already added to exam.js'
            }
        }
        exam.members.push(userId);
        await exam.save();
        return {
            data: exam,
            error: false,
            message: 'User added to exam.js successfully'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
const deleteExam = async (examId) => {
    try {
        const exam = await ExamModel.findById(examId);
        if (!exam) {
            return {
                data: null,
                error: true,
                message: 'Exam not found'
            }
        }
        await ExamModel.deleteOne({_id: examId});
        return {
            data: null,
            error: false,
            message: 'Exam deleted successfully'
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
    addExam,
    getAllExam,
    updateMemberExam,
    deleteExam,
    getComingExam,
    getExamById,
    getExamByIdFull
}