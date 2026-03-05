const express = require('express');
const userController = require('../controllers/user.controller');
const userValidation = require('../validations/user.validation');
const validationMiddleweare = require('../middlewares/validation.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const userRouter = express.Router();

userRouter
  .route('/')
  .get(userController.list)
  .post(authMiddleware, validationMiddleweare(userValidation.create), userController.update);

module.exports = userRouter;
