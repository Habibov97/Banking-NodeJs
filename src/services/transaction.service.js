const { TransactionModel, User } = require('../models');
const AppError = require('../utils/appError');

const transactionsByUser = async (id) => {
  return await TransactionModel.findAll({
    where: { userId: id },
    include: [
      {
        model: User,
        as: 'from',
        attributes: ['id', 'fullName', 'email'],
      },
      {
        model: User,
        as: 'to',
        attributes: ['id', 'fullName', 'email'],
      },
    ],
  });
};

const createTransaction = async (userId, params) => {
  const user = await User.findOne({ where: { id: userId } });

  let body = {
    userId,
    type: params.type,
    status: 'success',
    amount: params.amount,
  };

  if (params.type === 'transfer') {
    if (!params.to) throw new AppError('Receiver not found', 400);
    body.fromId = userId;
    body.toId = params.to;
  }

  let transaction = await user.createTransaction(body);

  if (params.type === 'transfer') {
    await TransactionModel.create({
      ...body,
      userId: params.to,
    });
  }
  return transaction;
};

const transactionService = { transactionsByUser, createTransaction };

module.exports = transactionService;
