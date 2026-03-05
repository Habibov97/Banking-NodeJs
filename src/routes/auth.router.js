const express = require('express');
const authController = require('../controllers/auth.controller');
const validationMiddleweare = require('../middlewares/validation.middleware');
const authValidation = require('../validations/auth.validation');

const authRouter = express.Router();

authRouter.route('/login').post(validationMiddleweare(authValidation.login), authController.login);
authRouter.route('/register').post(validationMiddleweare(authValidation.register), authController.register);

module.exports = authRouter;
