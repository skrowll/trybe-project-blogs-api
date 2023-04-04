const loginService = require('../services/login.service');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await loginService.login(email, password);
    res.status(200).json({ token: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
}; 