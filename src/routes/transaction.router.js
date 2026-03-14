const express = require('express');
const transactionController = require('../controllers/transaction.controller');
const transactionValidation = require('../validations/transaction.validation');
const validationMiddleweare = require('../middlewares/validation.middleware');

const transactionRouter = express.Router();

transactionRouter
  .route('/')
  .get(transactionController.userTransactions)
  .post(validationMiddleweare(transactionValidation.create), transactionController.createTransaction);

module.exports = transactionRouter;
