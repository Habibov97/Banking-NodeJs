const { z } = require('zod');

const create = z.object({
  fullName: z.string().optional(),
  phone: z.string().optional(),
  email: z.email(),
  password: z.string().min(6).max(100),
});

const userValidation = {
  create,
};

module.exports = userValidation;
