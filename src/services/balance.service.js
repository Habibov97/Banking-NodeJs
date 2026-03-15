const sequilize = require('../config/database');
const User = require('../models/User.model');
const AppError = require('../utils/appError');

const transferMoney = async (fromId, toId, amount) => {
  const t = await sequilize.transaction();
  try {
    const fromUser = await User.findOne({ where: { id: fromId } });
    const toUser = await User.findOne({ where: { id: toId } });

    if (!fromId || !toId) throw new AppError('Something went wrong, user is not found', 404);

    if (amount < 0) throw new AppError('Amount must be greater than 0', 400);

    if (fromUser.balance < amount) throw new AppError('Balance is not enough', 404);

    fromUser.balance -= amount;
    await fromUser.save({ transaction: t });

    toUser.balance += amount;
    await toUser.save({ transaction: t });

    await t.commit();
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const topupMoney = async (userId, amount) => {
  const t = await sequilize.transaction();
  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) throw new AppError('User is not found', 404);

    if (amount < 0) throw new AppError('Amount must be greater than 0');

    user.balance += amount;
    await user.save({ transaction: t });
    await t.commit();
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const payment = async (userId, amount) => {
  const t = await sequilize.transaction();
  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) throw new AppError('User is not found', 404);

    if (user.balance < amount) throw new AppError('Balance is insufficient', 400);

    user.balance -= amount;
    await user.save({ transaction: t });
    await t.commit();
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const balanceService = { transferMoney, topupMoney, payment };

module.exports = balanceService;
