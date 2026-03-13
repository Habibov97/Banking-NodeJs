const express = require('express');
const validationMiddleweare = require('../middlewares/validation.middleware');
const forgetPasswordValidation = require('../validations/forgetPassword.validation');
const forgetPasswordController = require('../controllers/forgetPassword.controller');

const forgetPasswordRouter = express.Router();

forgetPasswordRouter.get('/', (req, res, next) => {
  res.render('forget-password', { layout: false });
});

forgetPasswordRouter
  .route('/')
  .post(
    validationMiddleweare(forgetPasswordValidation.createForgetPasswordToken),
    forgetPasswordController.createForgetPasswordToken,
  );

forgetPasswordRouter
  .route('/confirm')
  .post(validationMiddleweare(forgetPasswordValidation.confirmPassword), forgetPasswordController.confirmPassword);

module.exports = forgetPasswordRouter;
