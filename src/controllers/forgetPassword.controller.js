const forgetPasswordService = require('../services/forgetPassword.service');

const createForgetPasswordToken = async (req, res) => {
  let result = await forgetPasswordService.createForgetPasswordToken(req.body.email);
  res.json(result);
};

const confirmPassword = async (req, res) => {
  let result = await forgetPasswordService.confirmPassword(req.body);
  res.json(result);
};

const forgetPasswordController = {
  createForgetPasswordToken,
  confirmPassword,
};

module.exports = forgetPasswordController;
