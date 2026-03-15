const { User, Activation } = require('../models');
const uuid = require('uuid');
const { sendMail } = require('../utils/mail.utils');
const AppError = require('../utils/appError');
const { addMinutes } = require('date-fns');
const renderTemplate = require('../utils/template.utils');
const config = require('../config');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const createForgetPasswordToken = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (!user) throw new AppError('user with this email is not exists', 404);

  const token = uuid.v4();

  await Activation.create({
    userId: user.id,
    token,
    type: 'activation',
    expireDate: addMinutes(new Date(), 10),
  });

  const mailContent = await renderTemplate('reset-password', {
    user: user.toJSON(),
    websiteUrl: config.appURL,
    activationLink: `${config.appURL}/api/forget-password?token=${token}`,
  });

  sendMail(config.smtp.from, user.email, 'Reset Password', mailContent);

  return {
    message: 'activation token has been sent to your email',
  };
};

const confirmPassword = async (params) => {
  const activation = await Activation.findOne({ where: { token: params.token, expireDate: { [Op.gte]: new Date() } } });
  if (!activation) throw new AppError('activation token is not valid', 400);

  let user = await User.findOne({ where: { id: activation.userId } });
  if (!user) throw new AppError('user not found', 404);

  if (params.password !== params.repeatPassword) throw new AppError('passwords do not match', 400);

  user.password = await bcrypt.hash(params.password, 10);
  await user.save();
  await activation.destroy();

  return {
    message: 'password changed successfully',
  };
};

const forgetPasswordService = {
  createForgetPasswordToken,
  confirmPassword,
};

module.exports = forgetPasswordService;
