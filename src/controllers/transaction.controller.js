const transactionService = require('../services/transaction.service');

const userTransactions = async (req, res) => {
  let result = await transactionService.transactionsByUser(req.user.id);
  res.json(result);
};

const createTransaction = async (req, res) => {
  let result = await transactionService.createTransaction(req.user.id, req.body);
  res.json(result);
};

const confirmTransaction = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: 'Missing token' });
    const transaction = await transactionService.confirmTransaction(token);
    res.json({ success: true, transaction });
  } catch (error) {
    next(error);
  }
};

const transactionController = {
  userTransactions,
  createTransaction,
  confirmTransaction,
};

module.exports = transactionController;
