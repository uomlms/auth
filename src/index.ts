import { connectDB } from '../config/db';
import { app } from './app';
import { User } from './models/user';

const createAdminUser = async () => {
  if (
    !process.env.ADMIN_USERNAME ||
    !process.env.ADMIN_EMAIL ||
    !process.env.ADMIN_PASSWORD
  ) {
    return;
  }

  const data = {
    name: process.env.ADMIN_USERNAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: "staff"
  };

  const adminUser = await User.findOne({ email: data.email });
  if (!adminUser) {
    const user = User.build(data);
    await user.save();
  }
}

const start = async () => {
  createAdminUser();
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET must be defined');
  }

  try {
    //conect database
    await connectDB();
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listenning on port 3000');
  });
}

start();
