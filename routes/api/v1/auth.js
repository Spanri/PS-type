"use strict";
import path from 'path';
import express from 'express';
import User from '../../../models/user';
import jwt from 'jsonwebtoken';
import { dberr } from '../../../helpers';
const router = express.Router();

const getToken = (req, payload) => jwt.sign(payload, req.app.get('secret'), {
  expiresIn: '10 days'
});

const verifyPassword = (user, password) => new Promise((resolve, reject) => {
   user.verifyPassword(password, (err, isValid) => {
     if (err) reject(err);
     else if (!isValid) reject(new Error('Invalid password'));
     else resolve();
   });
});

router.post('/signup', async (req, res, next) => {
  const userToCreate = {
    username: req.body.username,
    password: req.body.password,
    age: req.body.age,
    sex: req.body.sex,
  };
  try {
    const user = await User.create(userToCreate);
    const payload = { username: user.username, _id: user._id };
    user.firstEnt = true;
    return res.status(200).send({
      status: 'ok',
      message: 'User successfuly created',
      user: payload,
      token: getToken(req, payload)
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const firstErr = err.errors[Object.keys(err.errors)[0]];
      let message = 'Unexpected error';
      if (firstErr.kind === 'unique') message = 'User with this username already exists';
      else if (firstErr.message) message = firstErr.message;
      return res.status(400).send({
        status: 'error',
        message
      });
    }
    else return dberr(res);
  }
});


router.post('/signin', async (req, res, next) => {
  let user = null;
  try {
    user = await User.findOne({ username: req.body.username }).exec();
    if (!user) return res.status(404).send({
      status: 'error',
      message: 'User not found'
    });
    await verifyPassword(user, req.body.password);
  } catch (err) {
    if (err.message === 'Invalid password') return res.status(400).send({
      status: 'error',
      message: 'Wrong password'
    });
    else return dberr(res);
  }
  const payload = { username: user.username, _id: user._id };
  return res.status(200).send({
    status: 'ok',
    message: 'User successfuly authorized',
    token: getToken(req, payload)
  });
});

router.post('/welcome', async (req, res, next) => {
  User.firstEnt = false;
  return res.status(200).send({
      status: 'ok',
      message: 'The greeting will not be displayed'
    });
});

export default router;