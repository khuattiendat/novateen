const express = require('express');
const router = express.Router();
const ExamController = require('../controllers/ExamController');
const MiddlewareLogin = require('../middlewares/MiddlewareLogin');

router.post('/create', ExamController.addExam);
router.get('/get-all', MiddlewareLogin.verifyToken, ExamController.getAllExam);
router.get('/get-coming', MiddlewareLogin.verifyToken, ExamController.getComingExam);
router.get('/get-one/:examId', MiddlewareLogin.verifyToken, ExamController.getExamById);
router.get('/get-one-full/:examId', MiddlewareLogin.verifyToken, ExamController.getExamByIdFull);
router.put('/update-member', MiddlewareLogin.verifyToken, ExamController.updateMemberExam);
router.delete('/delete/:examId', MiddlewareLogin.verifyTokenTeacher, ExamController.deleteExam);

module.exports = router;