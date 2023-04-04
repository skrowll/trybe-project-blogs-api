const { User } = require('../database/models/index');
const { validateToken } = require('../services/jwt.service');

const getUserId = async (token) => {
  const user = await validateToken(token);
  const { id } = await User.findOne({ where: { email: user } });
  return id;
};

module.exports = getUserId;