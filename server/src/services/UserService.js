const UserModel = require('../models/UserModel');
const updateUser = async (id, data) => {
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return {
                data: null,
                error: true,
                message: 'User not found'
            }
        }
        const updatedUser = await UserModel.findByIdAndUpdate(id, data, {new: true});
        const {password, ...userWithoutPassword} = updatedUser._doc;
        return {
            data: userWithoutPassword,
            error: false,
            message: 'User updated successfully'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
const deleteUser = async (id) => {
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return {
                data: null,
                error: true,
                message: 'User not found'
            }
        }
        await UserModel.findByIdAndDelete(id);
        return {
            data: null,
            error: false,
            message: 'User deleted successfully'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
const getAllUser = async () => {
    try {
        const users = await UserModel.find({});
        return {
            data: users,
            error: false,
            message: 'Get all users successfully'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }

}
module.exports = {
    updateUser,
    deleteUser,
    getAllUser
}