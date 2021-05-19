import mongoose from 'mongoose';
const bcrypt = require("bcryptjs");
import jwt from 'jsonwebtoken';


// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
  name: string,
  email: string,
  password: string
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}


// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  name: string,
  email: string;
  password: string;
  getSignedJwtToken(): string;
  matchPassword(enteredPassword: string): boolean;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"]
  },
  email: {
    type: String,
    required: [true, "Please add an email"]
  },
  password: {
    type: String,
    required: [true, "Please add a password"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    }
  }
});

// not using arrow function to be able 
// to access User with 'this' keyword
userSchema.pre('save', async function (done) {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(this.get('password'), salt);
  this.set('password', hashed);
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this.get('id'), email: this.get('email') }, process.env.JWT_SECRET!); // without symbol "!" typescript is complaining because dont know about JWT_SECRET.
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.get('password'));
};

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };