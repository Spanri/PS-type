"use strict";
import path from 'path';
import express from 'express';
import User from '../../../models/user';
import Uservk from '../../../models/uservk';
import jwt from 'jsonwebtoken';
import { dberr,notFound } from '../../../helpers';
import jwt_decode from 'jwt-decode';
const router = express.Router();

//https://toster.ru/q/369662
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

router.post('/vksignup', async (req, res, next) => {
  const userToCreatevk = {
    usernamevk: req.body.usernamevk,
    idvk: req.body.idvk,
    age: req.body.age,
    sex: req.body.sex,
  };
  try {
    let findUs = await Uservk.findOne({idvk: req.body.idvk}).exec();
    if (findUs) {
      return res.status(400).send({
        status: 'error',
        message: 'User with this id already exists'
      });
    }
    else {
      const uservk = await Uservk.create(userToCreatevk);
      const payload = { idvk: uservk.idvk, _id: uservk._id };
      return res.status(200).send({
        status: 'ok',
        message: 'User successfuly created',
        uservk: payload,
        token: getToken(req, payload)
      });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      const firstErr = err.errors[Object.keys(err.errors)[0]];
      let message = 'Unexpected error';
      if (firstErr.message) message = firstErr.message;
      return res.status(400).send({
        status: 'error',
        message
      });
    }
    else return dberr(res);
  }
});

router.post('/signup', async (req, res, next) => {
  const userToCreate = {
    username: req.body.username,
    password: req.body.password,
    age: req.body.age,
    sex: req.body.sex
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

router.post('/vksignin', async (req, res, next) => {
  let uservk = null;
  try {
    uservk = await Uservk.findOne({ idvk: req.body.idvk }).exec();
    if (!uservk) return notFound(res);
  } catch (err) { return dberr(res); }
  const payload = { idvk: uservk.idvk, _id: uservk._id };
  return res.status(200).send({
    status: 'ok',
    message: 'User successfuly authorized',
    token: getToken(req, payload)
  });
});

export default router;