const {updateUser, deleteUser} = require("../services/UserService");
const UserController = {
    updateUser: async (req, res) => {
        try {
            const {id} = req.params;
            const data = req.body;
            const response = await updateUser(id, data);
            if (response.error) {
                return res.status(400).json(response);
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                data: null,
                error: true,
                message: error.message || error
            });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const {id} = req.params;
            const response = await deleteUser(id);
            if (response.error) {
                return res.status(400).json(response);
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                data: null,
                error: true,
                message: error.message || error
            });
        }
    }

}
module.exports = UserController;