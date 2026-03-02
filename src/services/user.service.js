const User = require('../database/User.model');

const list = async () => {
  let list = await User.findAll();
  return list;
};

const create = async (params) => {
  let user = await User.create(params);
};

const userService = {
  list,
  create,
};

module.exports = userService;
