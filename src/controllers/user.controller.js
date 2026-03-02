const userService = require('../services/user.service');

const list = async (req, res) => {
  let users = await userService.list();
  res.status(200).json(users);
};

const create = async (req, res) => {
  const result = await userService.create(req.body);
  res.json(result);
};

const userController = {
  list,
  create,
};

module.exports = userController;
