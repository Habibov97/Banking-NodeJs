const User = require('../database/User.model');

const login = async (params) => {};

const register = async (params) => {
  const existingUser = await User.findOne({ where: { email: params.email } });
  if (!existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  let user = await User.create(params);

  user.password = undefined;
  return user;
};

const authService = {
  login,
  register,
};

module.exports = authService;
