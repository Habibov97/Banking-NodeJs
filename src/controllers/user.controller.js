const userService = require('../services/user.service');

const list = async (req, res) => {
  let users = await userService.list();
  res.status(200).json(users);
};

const update = async (req, res) => {
  const result = await userService.update(req.user, req.body);

  res.json(result);
};

const userController = {
  list,
  update,
};

module.exports = userController;
