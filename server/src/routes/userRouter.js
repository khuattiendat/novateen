const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const MiddlewareLogin = require('../middlewares/MiddlewareLogin');
router.get('/get-all', MiddlewareLogin.verifyTokenTeacher, UserController.getAllUser)
router.put('/update/:id', MiddlewareLogin.verifyToken, UserController.updateUser)
router.delete('/delete/:id', MiddlewareLogin.verifyTokenTeacher, UserController.deleteUser)
module.exports = router;