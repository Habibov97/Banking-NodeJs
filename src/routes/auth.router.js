const express = require('express');
const authController = require('../controllers/auth.controller');
const validationMiddleweare = require('../middlewares/validation.middleware');
const authValidation = require('../validations/auth.validation');

const authRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterBody:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         fullName:
 *           type: string
 *           minLength: 3
 *           example: John Doe
 *         phone:
 *           type: string
 *           example: "0702088005"
 *         email:
 *           type: string
 *           format: email
 *           example: userexample@gmail.com
 *         password:
 *           type: string
 *           minLength: 6
 *           maxLength: 100
 *           example: secret123
 *     LoginBody:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: userexample@gmail.com
 *         password:
 *           type: string
 *           minLength: 6
 *           maxLength: 100
 *           example: secret123
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterBody'
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 *
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginBody'
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 */

authRouter.route('/login').post(validationMiddleweare(authValidation.login), authController.login);
authRouter.route('/register').post(validationMiddleweare(authValidation.register), authController.register);

module.exports = authRouter;
