const express = require('express');
const userController = require('../controllers/user.controller');
const userValidation = require('../validations/user.validation');
const validationMiddleweare = require('../middlewares/validation.middleware');

const userRouter = express.Router();

userRouter.route('/').get(userController.list);
// .post(validationMiddleweare(userValidation.create), userController.create);

module.exports = userRouter;
