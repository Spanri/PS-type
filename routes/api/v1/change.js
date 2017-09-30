"use strict";
import path from 'path';
import express from 'express';
import User, {validator} from '../../../models/user';
import Uservk from '../../../models/uservk';
import { dberr, ok, notFound, valerr } from '../../../helpers';
import jwt_decode from 'jwt-decode';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/', async (req, res, next) => {
  jwt.verify(req.body.token, '5i39Tq2wX00PC0QEuA350vi7oDB2nnq3', async (err, decoded) => {
    if(err){
      res.status(500).send({
        status: 'error',
        message: 'Verify error',
        message2: err.message
    });
    }else{
      //let token = jwt_decode(req.body.token); //получаю токен
      let token = decoded;
      let user = null, uservk = null;
      try { //выношу из токена данные в user
        user = await User.findOne({ _id: token._id }).exec();
        uservk = await Uservk.findOne({ _id: token._id }).exec();
        if (!user && !uservk) return notFound(res);
      } catch (err) { return dberr(res); }
      if (user) try { //меняю age или sex, если надо
        if (req.body.age && req.body.age!=user.age) user.age = req.body.age; 
        if (req.body.sex && req.body.sex!=user.sex) user.sex = req.body.sex;
        await user.save(); //сохраняю
        return ok(res);
      } catch (err) {valerr(res, err);}
      else try {
        if (req.body.age && req.body.age!=uservk.age) uservk.age = req.body.age;
        if (req.body.sex && req.body.sex!=uservk.sex) uservk.sex = req.body.sex;
        await uservk.save();
        return ok(res);
      } catch (err) {valerr(res, err);}
    }
  });
  
});

router.post('/data', async (req, res, next) => {
  let token = jwt_decode(req.body.token); //получаю токен
  let user = null, uservk = null;
  try { //выношу из токена данные в user
    user = await User.findOne({ _id: token._id }).exec();
    uservk = await Uservk.findOne({ _id: token._id }).exec();
    if (!user && !uservk) return notFound(res);
  } catch (err) { return dberr(res); }
  if (user) return res.status(200).send({
    status: 'ok',
    message: 'Data successfuly received',
    age: user.age,
    sex: user.sex,
    type: user.obr.type,
    username: user.username
  }); 
  else return res.status(200).send({
    status: 'ok',
    message: 'Data successfuly received',
    age: uservk.age,
    sex: uservk.sex,
    type: uservk.obr.type,
    username: uservk.usernamevk
  });
});

export default router;