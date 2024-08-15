const express = require('express')
const MiddlewareLogin = require('../middlewares/MiddlewareLogin')
const router = express.Router();
const AuthController = require('../controllers/AuthController');
//[/api/auth/register]
router.post('/register', AuthController.register)
//[/api/auth/login]
router.post('/login', AuthController.login)
//[/api/auth/logout]
router.get('/logout', MiddlewareLogin.verifyToken, AuthController.logout)
//[/api/auth/refresh-token]
router.post('/refresh', AuthController.requestRefreshToken)

module.exports = router;