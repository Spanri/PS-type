"use strict";
import path from 'path';
import express from 'express';
import User, {validator} from '../../../models/user';
import Uservk from '../../../models/uservk';
import { dberr, catchErr } from '../../../helpers';
const router = express.Router();

router.post('/vk', async (req, res, next) => {
let uservk = null;
  try {
    uservk = await Uservk.findOne({ idvk: req.body.idvk }).exec();
    if (!uservk) return res.status(404).send({
      status: 'error',
      message: 'User not found'
    });
  } catch (err) { return dberr(res); }
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

router.post('/', async (req, res, next) => {
    let user = null;
  try {
    user = await User.findOne({ username: req.body.username }).exec();
    if (!user) return res.status(404).send({
      status: 'error',
      message: 'User not found'
    });
  } catch (err) { return dberr(res); }
try{
  //Простите, я не могу поймать эти ошибки catch-ем, не знаю почему
   if (req.body.age) if (req.body.age<14) 
     return res.status(400).send({
         status: 'error',
         message: 'Age must be >=14'
     }); else if (req.body.age>110) 
     return res.status(400).send({
         status: 'error',
         message: 'Age must be <=110'
     }); else
     User.update( { username: req.body.username } , { $set: { age: req.body.age} }, function(err){});
  if (req.body.sex) if(!(typeof(req.body.sex) === "boolean")) 
    return res.status(400).send({
        status: 'error',
        message: 'Sex must be boolean (true for male)'
    }); else
    User.update( { username: req.body.username } , { $set: {sex: req.body.sex } }, function(err){});
    return res.status(200).send({
        status: 'ok',
        message: 'User successfuly changed'
    });
} catch(err) {return dberr(res);}
});

export default router;