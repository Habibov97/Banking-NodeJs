const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const { encodePayload } = require('../utils/jwt.utils');
const AppError = require('../utils/appError');
const renderTemplate = require('../utils/template.utils');
const config = require('../config');
const { sendMail } = require('../utils/mail.utils');

const login = async (params) => {
  const user = await User.findOne({ where: { email: params.email } });
  if (!user) throw new AppError('email or password is incorrect', 400);

  const password = await bcrypt.compare(params.password, user.password);
  if (!password) throw new AppError('email or password is incorrect', 400);

  const token = encodePayload({ userId: user.id });

  user.password = undefined;

  return { user, token };
};

const register = async (params) => {
  const existingUser = await User.findOne({ where: { email: params.email } });
  if (existingUser) throw new AppError('User already exists', 409);

  let user = await User.create(params);
  user.password = undefined;

  const mailContent = await renderTemplate('welcome-mail', {
    user: user.toJSON(),
    activationLink: `http://localhost.com`,
    supportMail: 'info@john.com',
  });

  await sendMail(config.smtp.from, user.email, 'Welcome to our app', mailContent);

  return user;
};

const authService = {
  login,
  register,
};

module.exports = authService;
