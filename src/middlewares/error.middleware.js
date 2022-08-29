const errors = {
    BadRequest: 400,
    Unauthorized: 401,
    NotFound: 404,
    Conflict: 409,
};

const errorHandlerMiddleware = ({ code, message }, _req, res, _next) => {
    const status = errors[code];
    if (!status) return res.sendStatus(500);
    res.status(status).json({ message });
};

module.exports = errorHandlerMiddleware;