import express from 'express';
import { currentUser } from '@uomlms/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  // we want to return null instead of undefined in case of not logged in user
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter }