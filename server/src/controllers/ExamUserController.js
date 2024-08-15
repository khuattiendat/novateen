const {addExamUser, getRating, getExamUserByUserId} = require("../services/ExamUserService");
const ExamUserController = {
    addExamUser: async (req, res) => {
        try {
            const examUser = req.body;
            const response = await addExamUser(examUser);
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
    getRating: async (req, res) => {
        try {
            const examId = req.params.examId;
            const response = await getRating(examId);
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
    getExamUserByUserId: async (req, res) => {
        try {
            console.log(req.body)
            const {userId, examId} = req.body?.data;
            const response = await getExamUserByUserId(userId, examId);
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
module.exports = ExamUserController;