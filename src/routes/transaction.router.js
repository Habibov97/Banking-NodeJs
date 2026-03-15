const express = require('express');
const transactionController = require('../controllers/transaction.controller');
const transactionValidation = require('../validations/transaction.validation');
const validationMiddleweare = require('../middlewares/validation.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const transactionRouter = express.Router();

transactionRouter
  .route('/')
  .get(authMiddleware, transactionController.userTransactions)
  .post(authMiddleware, validationMiddleweare(transactionValidation.create), transactionController.createTransaction);

transactionRouter.get('/confirm', (req, res) => {
  res.render('transaction-confirmation-page'); // your handlebars page
});
transactionRouter.post('/confirm', transactionController.confirmTransaction);

module.exports = transactionRouter;
