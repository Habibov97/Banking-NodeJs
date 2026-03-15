const express = require('express');
const userRouter = require('./user.router');
const authRouter = require('./auth.router');
const forgetPasswordRouter = require('./forgetPassword.router');

const transactionRouter = require('./transaction.router');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/forget-password', forgetPasswordRouter);
router.use('/transactions', transactionRouter);

module.exports = router;
