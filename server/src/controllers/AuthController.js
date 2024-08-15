const {register, login, generateAccessToken, generateRefreshToken} = require('../services/AuthService')
const RefreshTokenModel = require('../models/RefreshTokenModel');
const jwt = require('jsonwebtoken');
const AuthController = {
    register: async (req, res) => {
        try {
            const data = req.body;
            const response = await register(data);
            if (response.error) {
                return res.status(400).json(response);
            }
            return res.status(201).json(response);
        } catch (error) {
            return res.status(500).json({
                data: null,
                message: error.message || error,
                error: true
            });
        }
    },
    login: async (req, res) => {
        try {
            const data = req.body;
            const response = await login(data);
            if (response.error) {
                return res.status(400).json(response);
            }
            const refreshToken = response.data?.refreshToken;
            console.log("ref",refreshToken)
            await res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict'
            });
            return res.status(200).json({
                data: {
                    user: response.data?.user,
                    accessToken: response?.data?.accessToken,
                },
                message: 'Login successfully',
                error: false
            });
        } catch (error) {
            return res.status(500).json({
                data: null,
                message: error.message || error,
                error: true
            });
        }
    },
    logout: async (req, res) => {
        try {
            await res.clearCookie('refreshToken');
            return res.status(200).json({
                data: null,
                message: 'Logout successfully',
                error: false
            });
        } catch (error) {
            return res.status(500).json({
                data: null,
                message: error.message || error,
                error: true
            });
        }
    },
    requestRefreshToken: async (req, res) => {
        //Take refresh token from user
        const refreshToken = req.cookies.refreshToken;
        console.log(refreshToken)
        //Send error if token is not valid
        if (!refreshToken) return res.status(401).json("You're not authenticated");
        const refreshTokens = await RefreshTokenModel.find({
            token: refreshToken,
        });
        if (!refreshTokens) {
            return res.status(403).json("Refresh token is not valid");
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
            if (err) {
                console.log(err);
            }
            //create new access token, refresh token and send to user
            const newAccessToken = generateAccessToken(user?.id, user?.role);
            const newRefreshToken = generateRefreshToken(user?.id, user?.role);
            //update refresh token in database
            await RefreshTokenModel.findOneAndUpdate(
                {user: user?.id},
                {token: newRefreshToken}
            );
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
            });
            res.status(200).json({
                accessToken: newAccessToken,
            });
        });
    },
}
module.exports = AuthController;