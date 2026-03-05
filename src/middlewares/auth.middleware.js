const User = require('../database/User.model');
const AppError = require('../utils/appError');
const { decodePayload } = require('../utils/jwt.utils');

const authMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) throw new AppError('Unauthorized!', 401);
  const token = authorization.split(' ')[1];

  const decoded = decodePayload(token);
  if (!decoded) throw new AppError('Unauthorized!', 401);

  const user = await User.findOne({ where: { id: decoded.userId } });
  if (!user) throw new AppError('Unauthorized!', 401);

  req.user = user;
  next();
};

module.exports = authMiddleware;
