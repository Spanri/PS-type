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
  jwt.verify(req.body.token, '5i39Tq2wX00PC0QEuA350vi7oDB2nnq3', async (err, token) => {
    if(err){
      res.status(500).send({
        status: 'error',
        message: 'Verify error',
        message2: err.message
    });
    }else{
      let user = null, uservk = null;
      try { //выношу из токена данные в user
        user = await User.findOne({ _id: token._id }).exec();
        uservk = await Uservk.findOne({ _id: token._id }).exec();
        if (!user && !uservk) return notFound(res);
      } catch (err) { return dberr(res); }
      if (user) try { //меняю age или sex, если надо
        if (req.body.age && req.body.age!=user.a.age) user.a.age = req.body.age; 
        if (req.body.sex && req.body.sex!=user.a.sex) user.a.sex = req.body.sex;
        await user.save(); //сохраняю
        return ok(res);
      } catch (err) {valerr(res, err);}
      else try {
        if (req.body.age && req.body.age!=uservk.a.age) uservk.a.age = req.body.age;
        if (req.body.sex && req.body.sex!=uservk.a.sex) uservk.a.sex = req.body.sex;
        await uservk.save();
        return ok(res);
      } catch (err) {valerr(res, err);}
    }
  });
  
});

router.post('/data', async (req, res, next) => {
  jwt.verify(req.body.token, '5i39Tq2wX00PC0QEuA350vi7oDB2nnq3', async (err, token) => {
    if (err) {
      res.status(500).send({
        status: 'error',
        message: 'Verify error',
        message2: err.message
      });
    } else {
      let token = jwt_decode(req.body.token); //получаю токен
      let user = null, uservk = null;
      try { //выношу из токена данные в user
        user = await User.findOne({ _id: token._id }).exec();
        uservk = await Uservk.findOne({ _id: token._id }).exec();
        if (!user && !uservk) return notFound(res);
      } catch (err) { return dberr(res); }
      if (user) {
        var birthday = user.a.age;
        var today = new Date();
        var years = today.getFullYear() - birthday.getFullYear();
        var b = new Date();
        await b.setFullYear(today.getFullYear());
        if (today < b) years--;
        return res.status(200).send({
          status: 'ok',
          message: 'Data successfuly received',
          age: years,
          data: user.a.age,
          sex: user.a.sex,
          type: user.a.obr.type,
          username: user.username
      });}
      else {
        var birthday = uservk.a.age;
        var today = new Date();
        var years = today.getFullYear() - birthday.getFullYear();
        var b = new Date();
        await b.setFullYear(today.getFullYear());
        if (today < b) years--;
        return res.status(200).send({
          status: 'ok',
          message: 'Data successfuly received',
          age: years,
          data: uservk.a.age,
          sex: uservk.a.sex,
          type: uservk.a.obr.type,
          username: uservk.usernamevk
        });
      }
    }
  });
});

export default router;