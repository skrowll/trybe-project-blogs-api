const userService = require('../services/user.service');
const getUserId = require('../helpers/getUserId');

const createUser = async (req, res, next) => {
    const { displayName, email, password, image } = req.body;
    try {
        const result = await userService.createUser(displayName, email, password, image);
        res.status(201).json({ token: result });
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (_req, res) => {
    const result = await userService.getAllUsers();
    res.status(200).json(result);
};

const getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await userService.getUserById(id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const removeMyUser = async (req, res) => {
    const token = req.headers.authorization;
    const userId = await getUserId(token);
    await userService.removeMyUser(userId);
    res.status(204).end();
};  

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    removeMyUser,
};