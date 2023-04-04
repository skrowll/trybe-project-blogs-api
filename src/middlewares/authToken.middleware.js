const jwtService = require('../services/jwt.service');

const authToken = (req, _res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        const error = new Error('Token not found');
        error.code = 'Unauthorized';
        throw error;
    }

    const user = jwtService.validateToken(authorization);

    req.user = user;

    next();
};

module.exports = authToken;