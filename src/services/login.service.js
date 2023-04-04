const { User } = require('../database/models');
const jwt = require('./jwt.service');
const { loginValidate } = require('../middlewares/validation.middleware');

const login = async (email, password) => {
    const isValid = loginValidate(email, password);
    if (!isValid) {
        const error = new Error('Some required fields are missing');
        error.code = 'BadRequest';
        throw error;
    }
    
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
        const error = new Error('Invalid fields');
        error.code = 'BadRequest';
        throw error;
    } 

    const token = jwt.createToken(email);

    return token;
};

module.exports = { 
  login,
};