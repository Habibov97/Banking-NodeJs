const transactionService = require('../services/transaction.service');

const userTransactions = async (req, res) => {
  let result = await transactionService.transactionsByUser(req.user.id);
  res.json(result);
};

const createTransaction = async (req, res) => {
  let result = await transactionService.createTransaction(req.user.id, req.body);
  res.json(result);
};

const transactionController = {
  userTransactions,
  createTransaction,
};

module.exports = transactionController;
