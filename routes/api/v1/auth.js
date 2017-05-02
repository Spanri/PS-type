"use strict";
import path from 'path';
import express from 'express';
import Datastore from 'nedb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  dberr,
  encerr,
  invup,
  invage,
  usralrex
} from '../../../helpers';
const router = express.Router();


// open db
const usersDb = new Datastore({
  filename: path.resolve(__dirname, '..', '..', '..', 'users.nedb'),
  autoload: true,
  onload: err => {
    err
      ?
      console.error(err) :
      console.log('Users db opened');
  }
});


const validateNameAndPass = (username, password) => {
  const pattern = new RegExp(/^[a-z0-9]{6,}$/i);
  return username && password && pattern.test(username) && pattern.test(password);
};


const findUser = username => new Promise((resolve, reject) => {
  usersDb.findOne({
    username
  }, (err, doc) => {
    if (err) reject(err);
    else resolve(doc);
  });
});


const createUser = user => new Promise((resolve, reject) => {
  usersDb.insert(user, (err, doc) => {
    if (err) reject(err);
    else resolve(doc);
  });
});


router.post('/signup', async(req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const age = req.body.age;
  if (!validateNameAndPass(username, password)) invup(res);
  if (age && (age < 14 || age >= 110)) return invage(res);

  const userToCreate = {
    username,
    age
  };

  try {
    const user = await findUser(username);
    if (user) throw new Error('user exists');
  } catch (err) {
    return err.message == 'user exists' ? usralrex(res) : dberr(res);
  }

  try {
    userToCreate.password = await bcrypt.hash(password, req.app.get('salt rounds'));
  } catch (err) {
    encerr(res);
  }

  try {
    const createdUser = await createUser(userToCreate);
    const payload = {
      username: createdUser.username,
      _id: createdUser._id
    };
    const token = jwt.sign(payload, req.app.get('secret'), {
      expiresIn: '10 days'
    });
    res.status(200).send({
      status: 'ok',
      message: 'User successfuly created',
      user: payload,
      token
    });
  } catch (err) {
    dberr(res);
  }
});


router.post('/signin', async(req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!validateNameAndPass(username, password)) return invup(res);

  let user = {};

  try {
    user = await findUser(username);
    if (!user) return res.status(400).send({
      status: 'error',
      message: 'User not found'
    });
  } catch (err) {
    dberr(res);
  }

  try {
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      const payload = {
        username: user.username,
        _id: user._id
      };
      const token = jwt.sign(payload, req.app.get('secret'), {
        expiresIn: '10 days'
      });
      res.status(200).send({
        status: 'ok',
        message: 'User successfuly authorized',
        token
      });
    } else res.status(400).send({
      status: 'error',
      message: 'Wrong password'
    });
  } catch (err) {
    encerr(res);
  }

});


export default router;