const UserModel = require('../models/UserModel')
const RefreshTokenModel = require('../models/RefreshTokenModel')
const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const generateAccessToken = (id, role) => {
    return jwt.sign(
        {
            id: id,
            role: role
        },
        process.env.JWT_ACCESS_KEY,
        {expiresIn: "1d"}
    );
}
const generateRefreshToken = (id, role) => {
    return jwt.sign(
        {
            id: id,
            role: role
        },
        process.env.JWT_REFRESH_KEY,
        {expiresIn: "365d"}
    );
}
register = async (data) => {
    try {
        const {name, role, email, phone, dateOfBirth, _password} = data;
        const checkEmail = await UserModel.findOne({email});
        if (!name) {
            return {
                data: null,
                message: 'Please provide a name',
                error: true
            }
        }
        if (!phone) {
            return {
                data: null,
                message: 'Please provide a phone number',
                error: true
            }
        }
        if (!_password) {
            return {
                data: null,
                message: 'Please provide an password',
                error: true
            }
        }
        if (checkEmail) {
            return {
                data: null,
                message: 'Email already exists',
                error: true
            }
        }
        const checkPhone = await UserModel.findOne({phone});
        if (checkPhone) {
            return {
                data: null,
                message: 'Phone already exists',
                error: true
            }
        }
        const salt = bcryptjs.genSaltSync(10);
        const hashPassword = bcryptjs.hashSync(_password, salt);
        const user = new UserModel({name, role, email, phone, dateOfBirth, password: hashPassword});
        await user.save();
        const {password, ...userWithoutPassword} = user?._doc;
        return {
            data: userWithoutPassword,
            message: 'User registered successfully',
            error: false
        }
    } catch (error) {
        return {
            data: null,
            message: error.message || error,
            error: true
        }
    }
}
const login = async (data) => {
    try {
        const {email, _password} = data;
        const user = await UserModel.findOne({email});
        if (!user) {
            return {
                data: null,
                message: 'Email or password is incorrect',
                error: true
            }
        }
        const isMatch = bcryptjs.compareSync(_password, user.password);
        if (!isMatch) {
            return {
                data: null,
                message: 'Email or password is incorrect',
                error: true
            }
        }
        const accessToken = generateAccessToken(user?._id, user?.role);
        const refreshToken = generateRefreshToken(user?._id, user?.role);
        await RefreshTokenModel.create({token: refreshToken, user: user?._id});
        const {password, ...userWithoutPassword} = user?._doc;
        return {
            data: {
                user: userWithoutPassword,
                accessToken,
                refreshToken
            },
            message: 'Login successfully',
            error: false
        }
    } catch (error) {
        return {
            data: null,
            message: error.message || error,
            error: true
        }
    }
}
module.exports = {
    register,
    login,
    generateAccessToken,
    generateRefreshToken
}