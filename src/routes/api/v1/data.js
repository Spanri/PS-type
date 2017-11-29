"use strict";
import path from 'path';
import express from 'express';
import User, {validator} from '../../../models/user';
import { dberr, ok, notFound, valerr } from '../../../helpers';
import jwt_decode from 'jwt-decode';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/change', async (req, res, next) => {
  jwt.verify(req.body.token, '5i39Tq2wX00PC0QEuA350vi7oDB2nnq3', async (err, token) => {
    if(err){
      res.status(500).send({
        status: 'error',
        message: 'Verify error',
        message2: err.message
    });
    }else{
      let user = null;
      try { //выношу из токена данные в user
        user = await User.findOne({ _id: token._id }).exec();
        if (!user) return notFound(res);
        let age = req.body.age, sex = req.body.sex, name = req.body.name, 
          experience = req.body.experience, country = req.body.country,
          city = req.body.city;
        if (age && age!=user.age) user.age = age; 
        if (sex && sex!=user.sex) user.sex = sex;
        if (name && name!=user.name) user.name = name; 
        if (experience && experience!=user.experience) user.experience = experience; 
        if (country && country!=user.country) user.country = country; 
        if (city && city!=user.city) user.city = city; 
        await user.save(); //сохраняю
        return ok(res);
      } catch (err) { return dberr(res); }
    }
  });
});

router.post('/', async (req, res, next) => {
  //проверка на валидность токена
  jwt.verify(req.body.token, '5i39Tq2wX00PC0QEuA350vi7oDB2nnq3', async (err, token) => {
    if (err) {
      res.status(500).send({
        status: 'error',
        message: 'Verify error',
        message2: err.message
      });
    } else {
      let user = null;
      try { //выношу из токена данные в user
        user = await User.findOne({ _id: token._id }).exec();
        if (!user) return notFound(res);
        //years
        let birthday = user.age;
        let today = new Date();
        let years = today.getFullYear() - birthday.getFullYear();
        let b = new Date();
        await b.setFullYear(today.getFullYear());
        if (today < b) years--;
        return res.status(200).send({
          status: 'ok',
          message: 'Data successfuly received',
          age: years,
          sex: user.sex,
          type: user.obr.type,
          name: user.name,
          experience: user.experience,
          country: user.country,
          city: user.city,
          age2: user.age
        });
      } catch (err) { return dberr(res); }
    }
  });
});

router.post('/getDate', async (req, res, next) => {
  //проверка на валидность токена
  jwt.verify(req.body.token, '5i39Tq2wX00PC0QEuA350vi7oDB2nnq3', async (err, token) => {
    if (err) {
      res.status(500).send({
        status: 'error',
        message: 'Verify error',
        message2: err.message
      });
    } else {
      let user = null;
      try { //выношу из токена данные в user
        user = await User.findOne({ _id: token._id }).exec();
        if (!user) return notFound(res);
        let str = '[';
        for (var k = 1; user.track.dateTrack[k] != null; k++);
        for (let i = k - 1; i >= 0; i--)
          str += `{dateTrack:/${user.track.dateTrack[i]}/,StartTime:/${user.track.startTime[i]}/,StopTime:/${user.track.stopTime[i]}/};`;
          str = str.slice(0, -1);
        str += ']';
        return res.status(200).send({
          status: 'ok',
          message: 'Date successfuly found',
          str: str
        });
      } catch (err) { return dberr(res); }
    }
  });
});

router.post('/getPoints', async (req, res, next) => {
  //проверка на валидность токена
  jwt.verify(req.body.token, '5i39Tq2wX00PC0QEuA350vi7oDB2nnq3', async (err, token) => {
    if (err) {
      res.status(500).send({
        status: 'error',
        message: 'Verify error',
        message2: err.message
      });
    } else {
      let user = null;
      try { //выношу из токена данные в user
        user = await User.findOne({ _id: token._id }).exec();
        if (!user) return notFound(res);
        let str = '[';
        for (var k = 1; user.track.dateTrack[k] != null; k++);
        for (let i = k - 1; i >= 0; i--)
          str += `{dateTrack:/${user.track.dateTrack[i]}/,StartTime:/${user.track.startTime[i]}/,StopTime:/${user.track.stopTime[i]}/};`;
          str = str.slice(0, -1);
        str += ']';
        return res.status(200).send({
          status: 'ok',
          message: 'Date successfuly found',
          str: str
        });
      } catch (err) { return dberr(res); }
    }
  });
});

export default router;