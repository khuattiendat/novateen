const QuestionModel = require('../models/QuestionModel');
const addQuestion = async (data) => {
    try {
        const {question, options} = data;
        if (!question || !options || options.length < 2) {
            return {
                data: null,
                error: true,
                message: 'Please provide a question and at least two options'
            }
        }
        const newQuestion = new QuestionModel({
            question,
            options
        });
        await newQuestion.save();
        return {
            data: newQuestion,
            error: false,
            message: 'Question added successfully'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
const getQuestionLimit = async (limit) => {
    try {
        const questions = await QuestionModel.aggregate([
            {$sample: {size: Number(limit)}}
        ]);
        return {
            data: questions,
            error: false,
            message: 'Questions fetched successfully'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
const checkCountQuestion = async () => {
    try {
        const count = await QuestionModel.countDocuments();
        return {
            data: count,
            error: false,
            message: 'Count fetched successfully'
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
    addQuestion,
    getQuestionLimit,
    checkCountQuestion
}