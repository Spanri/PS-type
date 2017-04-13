"use strict";
import path from 'path';
import express from 'express';
import Datastore from 'nedb';
import bcrypt from 'bcrypt';
const router = express.Router();

const SALT_ROUNDS = 10;

// open db
const usersDb = new Datastore({
  filename: path.resolve(__dirname, '..', '..', 'users.nedb'),
  autoload: true,
  onload: err => {
    err
      ? console.error(err)
      : console.log('Users db opened');
  }
});

router.post('/signin', (req, res, next) => {
  
});

router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const age = req.body.age;
  const pattern =  new RegExp(/^[a-z0-9]{6,}$/i);
  if (!username || !password || !pattern.test(username) || !pattern.test(password))
    res.status(400).send({
      status: 'error',
      message: 'Invalid username or password'
    });
  else if (age <= 14 || age >= 110) res.status(400).send({
    status: 'error',
    message: 'Invalid age. (must be 14..110)'
  });
  else usersDb.findOne({ username }, (err, doc)=> {
    if (err) res.status(500).send({
      status: 'error',
      message: 'Database error'
    });
    else if (doc) res.status(400).send({
      status: 'error',
      message: 'User already exists'
    });
    else {
      const user = {
        username,
        password: bcrypt.hashSync(password, SALT_ROUNDS),
        age
      };
      usersDb.insert(user, (err, doc) => {
        if (err) res.status(500).send({
          status: 'error',
          message: 'Database error'
        });
        else res.status(200).send({
          status: 'ok',
          message: 'User successfuly created',
          user: doc
        });
      });
    }
  });
});

router.get('/', (req, res, next) => {
  res.json({proverka: "Тут пиши signup или signin"});
});

export default router;