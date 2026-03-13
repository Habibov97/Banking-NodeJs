const express = require('express');
const userRouter = require('./user.router');
const authRouter = require('./auth.router');
const forgetPasswordRouter = require('./forgetPassword.router');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/forget-password', forgetPasswordRouter);

module.exports = router;
