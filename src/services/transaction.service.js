const { TransactionModel, User } = require('../models');
const AppError = require('../utils/appError');
const uuid = require('uuid');
const renderTemplate = require('../utils/template.utils');
const config = require('../config');
const { sendMail } = require('../utils/mail.utils');
const balanceService = require('./balance.service');

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
    // order: [['id', 'DESC']],
  });
};

const createTransaction = async (userId, params) => {
  const user = await User.findOne({ where: { id: userId } });

  let body = {
    userId,
    type: params.type,
    status: 'success', // topup goes straight through
    amount: params.amount,
  };

  if (params.type === 'transfer') {
    if (!params.to) throw new AppError('Receiver not found', 400);
    body.fromId = userId;
    body.toId = params.to;
  }

  // Topup and payment: no confirmation needed, create immediately
  if (params.type === 'topup') {
    await balanceService.topupMoney(userId, params.amount);
    return await user.createTransaction(body);
  } else if (params.type === 'payment') {
    await balanceService.payment(userId, params.amount);
    return await user.createTransaction(body);
  }

  // All other types: create as pending, send confirmation email
  body.status = 'pending';
  const token = uuid.v4();
  body.confirmToken = token; // store token on the transaction row

  const transaction = await user.createTransaction(body);

  const mailContent = await renderTemplate('transaction-confirm', {
    confirmUrl: `${config.appURL}/api/transactions/confirm?token=${token}`,
  });

  sendMail(config.smtp.from, user.email, 'Confirm Transaction', mailContent);

  return transaction;
};

const confirmTransaction = async (token) => {
  const transaction = await TransactionModel.findOne({
    where: { confirmToken: token, status: 'pending' },
  });

  if (!transaction) throw new AppError('Invalid or expired token', 400);

  if (transaction.type === 'transfer') {
    await balanceService.transferMoney(transaction.fromId, transaction.toId, transaction.amount);
  }

  await transaction.update({ status: 'success', confirmToken: null });

  // If it's a transfer, create the receiver-side record now
  if (transaction.type === 'transfer') {
    await TransactionModel.create({
      userId: transaction.toId,
      fromId: transaction.fromId,
      toId: transaction.toId,
      type: transaction.type,
      status: 'success',
      amount: transaction.amount,
    });
  }

  return transaction;
};

const transactionService = { transactionsByUser, createTransaction, confirmTransaction };

module.exports = transactionService;
