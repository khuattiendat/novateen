const express = require('express');
const router = express.Router();
const ExamUserController = require('../controllers/ExamUserController');

router.post('/create', ExamUserController.addExamUser);
router.get('/get-rating/:examId', ExamUserController.getRating);
router.post('/get-exam-user', ExamUserController.getExamUserByUserId);

module.exports = router;