const AppError = require('../utils/appError');

const validationMiddleweare = (schema) => {
  return (req, res, next) => {
    let { success, data, error } = schema.safeParse(req.body);

    if (!success) {
      return next(new AppError(error.issues, 400));
    }
    req.body = data;

    next();
  };
};

module.exports = validationMiddleweare;
