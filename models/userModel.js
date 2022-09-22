const mongoose = require('mongoose');
const { check } = require('express-validator');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  password: String,
});

UserSchema.statics.signup = async function (username, password) {
  if (!username || !password) {
    throw Error('All fields must be filled');
  }

  const userExists = await this.findOne({ username });

  if (userExists) {
    throw Error('Username already in use');
  }

  check('password').isLength({ min: 7 }).withMessage('Password too short');

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    password: hash,
  });

  return user;
};