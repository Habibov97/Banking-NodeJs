const User = require('./User.model');
const Activation = require('./Activation.model');
const TransactionModel = require('./Transaction.model');

//User relations
User.hasMany(TransactionModel, { foreignKey: 'userId', as: 'transactions' });
TransactionModel.belongsTo(User, { as: 'from', foreignKey: 'fromId', targetKey: 'id' });
TransactionModel.belongsTo(User, { as: 'to', foreignKey: 'toId', targetKey: 'id' });

module.exports = {
  User,
  Activation,
  TransactionModel,
};
