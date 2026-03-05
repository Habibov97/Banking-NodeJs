const authService = require('../services/auth.service');

const login = async (req, res) => {
  let result = await authService.login(req.body);

  res.status(200).json(result);
};

const register = async (req, res) => {
  let result = await authService.register(req.body);

  res.status(200).json({ message: 'User registered successfully', result });
};

const authController = {
  login,
  register,
};

module.exports = authController;
