const express = require('express');
const userController = require('../controllers/user.controller');
const userValidation = require('../validations/user.validation');
const validationMiddleweare = require('../middlewares/validation.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         email:
 *           type: string
 *           example: userexample@gmail.com
 *         fullName:
 *           type: string
 *           example: John Doe
 *         phone:
 *           type: string
 *           example: "0702088005"
 *         role:
 *           type: string
 *           enum: [admin, user]
 *           example: admin
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2026-03-09T07:27:31.749Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2026-03-09T07:27:31.749Z
 *     UserList:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserList'
 */

const userRouter = express.Router();

userRouter
  .route('/')
  .get(userController.list)
  .post(authMiddleware, validationMiddleweare(userValidation.create), userController.update);

module.exports = userRouter;
