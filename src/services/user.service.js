const { User } = require('../models');
const bcrypt = require('bcrypt');
const AppError = require('../utils/appError');

const list = async () => {
  let list = await User.findAll();
  let listModified = list.map((user) => {
    user.password = undefined;
    return user;
  });
  return listModified;
};

const update = async (data, params) => {
  const { uniqno: userId } = data;
  const user = await User.findByPk(userId);

  await user.update(params);

  // for (let [key, value] of Object.entries(params)) {
  //   user[key] = value;
  // }
  // await user.save();

  return user;
};

const resetPassword = async (userId, params) => {
  const { currentPassword, newPassword, repeatPassword } = params;

  const user = await User.findOne({ where: { id: userId } });
  if (!user) throw new AppError('User not found', 404);

  const passwordMatch = await bcrypt.compare(currentPassword, user.password);
  if (!passwordMatch) throw new AppError('User password is not correct', 400);

  if (newPassword !== repeatPassword) throw new AppError('Passwords do not match', 400);

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return {
    message: 'Password changed successfully',
  };
};

const userService = {
  list,
  update,
  resetPassword,
};

module.exports = userService;
