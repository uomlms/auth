/**
 * Make this a seperate file in order to 
 * load in supertest without listering on
 * specific port
 */


import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import { resolve } from "path"
import cookieSession from 'cookie-session';
import swaggerUi from 'swagger-ui-express';
import docs from '../docs/docs.json';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler, NotFoundError } from '@uomlms/common';

dotenv.config({ path: resolve(__dirname, "../config/config.env") });

const app = express();

app.use('/api/users/docs', swaggerUi.serve, swaggerUi.setup(docs));

// not to have problem with ingress-ngnix
app.set('trust proxy', true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false, // no encyption
    secure: process.env.NODE_ENV !== 'test', // only https except we are testing
  })
)

app.use(signupRouter);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all('*', async () => { throw new NotFoundError });

app.use(errorHandler);

export { app };