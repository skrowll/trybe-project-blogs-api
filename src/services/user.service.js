const { User } = require('../database/models');
const jwt = require('./jwt.service');
const { userValidate } = require('../middlewares/validation.middleware');

const createUser = async (displayName, email, password, image) => {
    const errorMessage = userValidate(displayName, email, password);
    if (errorMessage) {
        const error = new Error(errorMessage);
        error.code = 'BadRequest';
        throw error;
    }

    const user = await User.findOne({ where: { email } });
    if (user) {
        const error = new Error('User already registered');
        error.code = 'Conflict';
        throw error;
    } 

    await User.create({ displayName, email, password, image });

    const token = jwt.createToken(email);

    return token;
};

const getAllUsers = async () => {
    const result = await User.findAll({
        attributes: ['id', 'displayName', 'email', 'image'],
    });
    return result;
};

const getUserById = async (id) => {
    const result = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
    if (!result) {
        const error = new Error('User does not exist');
        error.code = 'NotFound';
        throw error;
    }
    return result;
};

const removeMyUser = async (id) => {
    const result = await User.findOne({
        where: { id },
        attributes: { exclude: ['password'] },
    });
    await result.destroy();
    return result;
};

module.exports = { 
    createUser,
    getAllUsers,
    getUserById,
    removeMyUser,
};