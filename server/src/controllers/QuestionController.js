const {addQuestion} = require('../services/QuestionService')
const QuestionController = {
    addQuestion: async (req, res) => {
        try {
            const data = req.body;
            const response = await addQuestion(data);
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
    }
}
module.exports = QuestionController;