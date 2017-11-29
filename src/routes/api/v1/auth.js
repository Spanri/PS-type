"use strict";
import path from 'path';
import express from 'express';
import User from '../../../models/user';
import jwt from 'jsonwebtoken';
import { dberr,notFound } from '../../../helpers';
import jwt_decode from 'jwt-decode';
const router = express.Router();

//https://toster.ru/q/369662
//get token, time of life - 10days, secret in app.js
const getToken = (req, payload) => jwt.sign(payload, req.app.get('secret'), {
  expiresIn: '10d'
});

const verifyPassword = (user, password) => new Promise((resolve, reject) => {
   user.verifyPassword(password, (err, isValid) => {
     if (err) reject(err);
     else if (!isValid) reject(new Error('Invalid password'));
     else resolve();
   });
});

router.post('/signup', async (req, res, next) => {
  //create object with info about user
  const userToCreate = {
    username: req.body.username,
    password: req.body.password,
    age: req.body.age,
    sex: req.body.sex,
    name: req.body.name,
    experience: req.body.experience,
    country: req.body.country,
    city: req.body.city
  };
  try {
    const user = await User.create(userToCreate);
    const payload = { username: user.username, _id: user._id };
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
    if (!user) return notFound(res);
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

export default router;