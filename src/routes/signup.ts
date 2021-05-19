import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError, validateRequest } from '@uomlms/common';

const router = express.Router();

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