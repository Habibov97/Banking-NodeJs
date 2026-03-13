const { z } = require('zod');

const createForgetPasswordToken = z.object({
  email: z.email(),
});

const confirmPassword = z.object({
  password: z.string().min(6).max(100),
  repeatPassword: z.string().min(6).max(100),
  token: z.uuid(),
});

const forgetPasswordValidation = {
  createForgetPasswordToken,
  confirmPassword,
};

module.exports = forgetPasswordValidation;
