const express = require('express');
const router = express.Router();
const questionController = require('../controllers/QuestionController');

router.post('/create', questionController.addQuestion);

module.exports = router;