const User = require('../database/User.model');

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

const userService = {
  list,
  update,
};

module.exports = userService;
