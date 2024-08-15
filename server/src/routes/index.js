const AuthRouter = require('./authRouter');
const UserRouter = require('./userRouter');
const QuestionRouter = require('./questionRouter');
const ExamRouter = require('./examRouter');
const ExamUserRouter = require('./examUserRouter');
const Router = (app) => {
    app.use('/api/auth', AuthRouter);
    app.use('/api/users', UserRouter);
    app.use('/api/questions', QuestionRouter);
    app.use('/api/exams', ExamRouter);
    app.use('/api/exam-user', ExamUserRouter);
}

module.exports = Router;