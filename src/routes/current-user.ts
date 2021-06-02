import express from 'express';
import { currentUser } from '@uomlms/common';

const router = express.Router();

/**
 * @swagger
 *
 * /api/users/currentuser:
 *   get:
 *     summary: Returns the current user.
 *     description: Returns the current user. if token not provided or expires will return null
 *     produces:
 *       - application/json
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
router.get('/api/users/currentuser', currentUser, (req, res) => {
  // we want to return null instead of undefined in case of not logged in user
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter }