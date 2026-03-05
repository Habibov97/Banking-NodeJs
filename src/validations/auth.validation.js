const { z } = require('zod');

const register = z.object({
  fullName: z.string().optional(),
  phone: z.string().optional(),
  email: z.email(),
  password: z.string().min(6).max(100),
});

const login = z.object({
  email: z.email(),
  password: z.string().min(6).max(100),
});

const userValidation = {
  register,
  login,
};

module.exports = userValidation;
