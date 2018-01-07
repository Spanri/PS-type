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
          username = req.body.username, experience = req.body.experience, 
          country = req.body.country, city = req.body.city;
        if (age && age!=user.age) user.age = age; 
        if (sex && sex!=user.sex) user.sex = sex;
        if (name && name!=user.name) user.name = name; 
        if (username && username!=user.username) user.username = username;
        if (experience && experience!=user.experience) user.experience = experience; 
        if (country && country!=user.country) user.country = country; 
        if (city && city!=user.city) user.city = city; 
        console.log(user.username);
        await user.save(); //сохраняю
        return ok(res);
      } catch (err) { return dberr(res); }
    }
  });
});

router.post('/all', async (req, res, next) => {
  jwt.verify(req.body.token, '5i39Tq2wX00PC0QEuA350vi7oDB2nnq3', async (err, token) => {
    if (err) {
      res.status(500).send({
        status: 'error',
        message: 'Verify error',
        message2: err.message
      });
    } else {
      let user = null;
      try {
        user = await User.findOne({ _id: token._id }).exec();
        if (!user) return notFound(res);
        if (user.username != "admin0" && user.username != "id136955296")
          return res.status(404).send({
            status: 'error',
            message: 'User is not admin'
          });
        var all = await User.find({}).exec();
        return res.status(200).send({
          status: 'ok',
          message: 'Data successfuly received',
          all: all
        });

      } catch (err) { return dberr(res); }
    }
  });
});

//изменение данных в админке (вход по паролю админа)
router.post('/changeAdmin', async (req, res, next) => {
  jwt.verify(req.body.token, '5i39Tq2wX00PC0QEuA350vi7oDB2nnq3', async (err, token) => {
    if (err) {
      res.status(500).send({
        status: 'error',
        message: 'Verify error',
        message2: err.message
      });
    } else {
      let user = null;
      try {
        user = await User.findOne({ _id: token._id }).exec();
        if (!user) return notFound(res);
        if (user.username != "admin0" && user.username != "id136955296")
          return res.status(404).send({
            status: 'error',
            message: 'User is not admin'
          });
        var userChange = await User.findOne({ username: req.body.usernameAuth }).exec();
        let par = (req.body.nameOfPar).slice(0,-1), data = req.body.data;
        // for(let i=0;i<userChange.length;i++) {
        //   //надо if(par==a..., где а="age", например
        //   if (par==??? && data!=userChange[i]) {
        //     userChange[i].age = data;
        //     break;
        //   }
        // }
        if (par=="age" && par!=userChange.age) userChange.age = data; 
        else if (par=="sex" && par!=userChange.sex) userChange.sex = data;
        else if (par=="date" && par!=userChange.date) userChange.date = data;
        else if (par=="type" && par!=userChange.obr.type) userChange.obr.type = data;
        else if (par=="points" && par!=userChange.points) userChange.points = data;
        else if (par=="speed" && par!=userChange.speed) userChange.speed = data;
        else if (par=="lalitude" && par!=userChange.lalitude) userChange.lalitude = data;
        else if (par=="longitude" && par!=userChange.longitude) userChange.longitude = data;
        else if (par=="name" && par!=userChange.name) userChange.name = data; 
        else if (par=="username" && par!=userChange.username) userChange.username = data;
        else if (par=="experience" && par!=userChange.experience) userChange.experience = data; 
        else if (par=="country" && par!=userChange.country) userChange.country = data; 
        else if (par=="city" && par!=userChange.city) userChange.city = data;
        await userChange.save();
        return res.status(200).send({
          status: 'ok',
          message: 'Data successfuly changed'
        });

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
          name: user.name,
          username: user.username,
          experience: user.experience,
          country: user.country,
          city: user.city,
          age2: user.age,
          max: user.obr.max,
          dist: user.obr.dist,
          avtime: user.obr.avtime,
          radvar: user.obr.radvar,
          date: user.obr.date,
          type: user.obr.type
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
          str += `{dateTrack:"${user.track.dateTrack[i]}",StartTime:"${user.track.startTime[i]}",StopTime:"${user.track.stopTime[i]}"};`;
          str = str.slice(0, -1);
        str += ']';
        return res.status(200).send({
          status: 'ok',
          message: 'Date successfuly received',
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
        let dateTrack = req.body.dateTrack, startTime = req.body.StartTime;
        for (let i = 0; user.track.dateTrack[i] != null; i++)
          if (dateTrack == user.track.dateTrack[i] && startTime == user.track.startTime[i])
            return res.status(200).send({
              status: 'ok',
              message: 'Date successfuly received',
              points: user.track.points[i]
            });
        return res.status(404).send({
          status: 'error',
          message: 'Date not found'
        });
      } catch (err) { return dberr(res); }
    }
  });
});

export default router;