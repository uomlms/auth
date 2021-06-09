import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError, validateRequest } from '@uomlms/common';

const router = express.Router();

/**
 * @swagger
 *
 * /api/users/signup:
 *   post:
 *     summary: Signs up a user.
 *     description: Signs up a user.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         summary: Signs up a user.
 *         description: The user's name
 *         type: string
 *         required: true
 *       - name: email
 *         description: The user's email
 *         type: email
 *         required: true
 *       - name: password
 *         description: The user's password
 *         type: password
 *         required: true
 *     responses:
 *       200:
 *         description: Returns the current user. If JWT is not provided as cookie, will return null
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentUser:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The currennt user's id.
 *                       example: 60a96e2f
 *                     email:
 *                       type: email
 *                       description: The currennt user's email.
 *                       example: test@test.gr
 *                     iat:
 *                       type: integer
 *                       description: JWT Issued At.
 *                       example: 1621717307
 */
router.post(
  '/api/users/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is mandatory')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('Email already exists');
    }

    const user = User.build({ name, email, password });
    await user.save();

    // Generate JWT
    const userJwt = user.getSignedJwtToken();

    req.session = {
      jwt: userJwt
    };
    res.status(201).send(user);
  });

export { router as signupRouter }