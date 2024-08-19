const {
    addExam,
    getAllExam,
    updateMemberExam,
    deleteExam,
    getExamById,
    getComingExam,
    getExamByIdFull
} = require('../services/ExamService');
const examController = {
    addExam: async (req, res) => {
        try {
            const exam = req.body;
            const response = await addExam(exam);
            if (response.error) {
                return res.status(400).json(response);
            }
            return res.status(201).json(response);
        } catch (error) {
            return res.status(500).json({
                data: null,
                error: true,
                message: error.message || error
            });
        }
    },
    getAllExam: async (req, res) => {
        try {
            const response = await getAllExam();
            if (response.error) {
                return res.status(400).json(response);
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                data: null,
                error: true,
                message: error.message || error
            });
        }
    },
    updateMemberExam: async (req, res) => {
        try {
            const {examId, userId} = req.body;
            const response = await updateMemberExam(examId, userId);
            if (response.error) {
                return res.status(400).json(response);
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                data: null,
                error: true,
                message: error.message || error
            });
        }
    },
    deleteExam: async (req, res) => {
        try {
            const {examId} = req.params;
            const response = await deleteExam(examId);
            if (response.error) {
                return res.status(400).json(response);
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                data: null,
                error: true,
                message: error.message || error
            });
        }
    },
    getExamById: async (req, res) => {
        try {
            const {examId} = req.params;
            const response = await getExamById(examId);
            if (response.error) {
                return res.status(400).json(response);
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                data: null,
                error: true,
                message: error.message || error
            });
        }
    },
    getExamByIdFull: async (req, res) => {
        try {
            const {examId} = req.params;
            const response = await getExamByIdFull(examId);
            if (response.error) {
                return res.status(400).json(response);
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                data: null,
                error: true,
                message: error.message || error
            });
        }
    },
    getComingExam: async (req, res) => {
        try {
            const response = await getComingExam();
            if (response.error) {
                return res.status(400).json(response);
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                data: null,
                error: true,
                message: error.message || error
            });
        }
    }
}
module.exports = examController;