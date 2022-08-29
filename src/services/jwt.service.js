require('dotenv/config');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
    const token = jwt.sign({ data: user }, process.env.JWT_SECRET, {
        expiresIn: '1d',
        algorithm: 'HS256',
    });
    return token;
};

const validateToken = (token) => {
    try {
        const { data } = jwt.verify(token, process.env.JWT_SECRET);
        return data;
    } catch (error) {
        const err = new Error('Expired or invalid token');
        err.code = 'Unauthorized';
        throw err;
    }
};

module.exports = {
    createToken,
    validateToken,
  };