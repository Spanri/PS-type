"use strict";
import path from 'path';
import express from 'express';
import User from '../../../models/user';
import Uservk from '../../../models/uservk';
import jwt from 'jsonwebtoken';
import { dberr } from '../../../helpers';
const router = express.Router();

router.post('/vk', async (req, res, next) => {
//connecting to user
let uservk = null;
  try {
    uservk = await Uservk.findOne({ idvk: req.body.idvk }).exec();
    if (!uservk) return res.status(404).send({
      status: 'error',
      message: 'User not found'
    });
  } catch (err) { return dberr(res); }
//change
try{
    if (req.body.age) uservk.age = req.body.age;
    if (req.body.sex) uservk.sex = req.body.sex;
    uservk.save(function(err) {
       if (err) {if (err.name === 'ValidationError') {
      const firstErr = err.errors[Object.keys(err.errors)[0]];
      let message = 'Unexpected error';
      if (firstErr.message) message = firstErr.message;
      return res.status(400).send({
        status: 'error',
        message
      });
       } }
    else return res.status(200).send({
        status: 'ok',
        message: 'User successfuly changed'
    });
    });
} catch(err) { return dberr(res); }
});

export default router;