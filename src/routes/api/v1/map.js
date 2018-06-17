"use strict";
import path from 'path';
import express from 'express';
import User from '../../../models/user';
import { dberr, ok, notFound, valerr } from '../../../helpers';
import jwt_decode from 'jwt-decode';
import jwt from 'jsonwebtoken';
const router = express.Router();

/** @see module:api/v1/map/* */
/** @module api/v1/map/* */

/**
 * Занесение accel в бд.
 * 
 * @name Accel в бд
 * @route {POST} /get1
 * @queryparam {String} token Токен
 * @queryparam {Date} date Дата
 * @queryparam {Date} firstTime Первое время
 * @queryparam {Date} lastTime Последнее время
 */
router.post('/get1', async (req, res, next) => {
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

        var mas = [];
        for (let k = 0; user.accel.date[k] != null; k++) {
          if(user.accel.date[k] == req.body.date) {
              if(user.accel.time[k] < req.body.lastTime && user.accel.time[k] > req.body.firstTime){
                  mas.push({
                    x: user.accel.x[k], 
                    y: user.accel.y[k], 
                    z: user.accel.z[k], 
                    lon: user.accel.lon[k], 
                    lat: user.accel.lat[k]
                  });
                }
          }
        }
        return res.status(200).send({
          status: 'ok',
          message: 'Date successfuly received',
          mas: mas
        });
      } catch (err) { return dberr(res); }
    }
  });
});

/**
 * Занесение одного объекта с координатами в бд.
 * Добавляет местоположение в массив с координатами пользователя.
 * Примечание: долгота, широта и скорость не заданы на сервере 
 * как обязательные (техническая необходимость), будет выдавать 
 * ошибку casterror в случае отсутствия чего-либо их этого.
 * 
 * @name Координаты в бд
 * @route {POST} /pos
 * @queryparam {String} token Токен
 * @queryparam {Number} latitude Широта
 * @queryparam {Number} longitude Долгота
 * @queryparam {Number} speed Скорость
 * @queryparam {Date} date Дата
 */
router.post('/pos', async (req, res, next) => {
  jwt.verify(req.body.token, '5i39Tq2wX00PC0QEuA350vi7oDB2nnq3', async (err, token) => {
    if(err){
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
        await User.update({ _id: user._id }, {
          $push: {
            latitude: { $each: [req.body.latitude] },
            longitude: { $each: [req.body.longitude] },
            speed: { $each: [req.body.speed] },
            date: { $each: [req.body.date] }
          }
        });
        return res.status(200).send({
          status: 'ok',
          message: 'Data successfuly processed'
        });
      } catch (err) { return dberr(res); }
    }
  });
});

/**
 * Занесение dateTrack, startTime в бд.
 * 
 * @name dateTrack, startTime в бд
 * @route {POST} /startPos
 * @queryparam {String} token Токен
 * @queryparam {String} dateTrack Дата трека
 * @queryparam {String} StartTime Начальное время
 */
router.post('/startPos', async (req, res, next) => {
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
        await User.update({ _id: user._id }, {
          $push: {
            'track.dateTrack': { $each: [req.body.dateTrack] },
            'track.startTime': { $each: [req.body.StartTime] }
          }
        });
        return ok(res);
      } catch (err) { return dberr(res); }
    }
  });
});

/**
 * Занесение stopTime, points в бд.
 * 
 * @name stopTime, points в бд.
 * @route {POST} /getLastData
 * @queryparam {String} token Токен
 * @queryparam {Array} points Массив из данных о треке за промежуток времени
 * @queryparam {String} StopTime Конечное время
 */
router.post('/getLastData', async (req, res, next) => {
  jwt.verify(req.body.token, '5i39Tq2wX00PC0QEuA350vi7oDB2nnq3', async (err, token) => {
    if(err){
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
        try {
          await User.update({ _id: user._id }, {
            $push: {
              'track.stopTime': { $each: [req.body.StopTime] },
              'track.points': { $each: [req.body.points] }
            }
          });
        } catch (err) { return res.status(404).send({
          status: 'error',
          message: 'Error in saving'
          }); 
        }
        return ok(res);
      } catch (err) { return dberr(res); }
    }
  });
});

/**
 * Обрабатывает данные и вычисляет тип водителя. 
 * Пока что доступны градации по скорости - лихач, 
 * черепашка, обычный человек.
 * Вызывать каждый раз по окончании режима водителя.
 * 
 * @name Обработка данных
 * @route {POST} /obr
 * @queryparam {String} token Токен
 */
router.post('/obr', async (req, res, next) => {
  jwt.verify(req.body.token, '5i39Tq2wX00PC0QEuA350vi7oDB2nnq3', async (err, token) => {
    if(err){
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
        try {
          await obr(res, user);
        } catch (err) { return res.status(404).send({
          status: 'error',
          message: 'Error in saving'
          }); 
        }
        return ok(res);
      } catch (err) { return dberr(res); }
    }
  });
});

/**
 * Обработка данных пользователя, ф-ция нужна для route "/obr".
 * 
 * @function
 * @async
 * @param {} res - response, для возвращения ответов
 * @param {} user - объект, данные которого надо обработать
 */
async function obr(res, user) {
  try{
    //max speed
    user.obr.max = await Math.max.apply( Math, user.speed );
    if(user.obr.max > 100) user.obr.type = "Лихач";
    else if(user.obr.max < 40) user.obr.type = "Черепашка";
    else user.obr.type = "Обычный человек";

    //max dist
    let cl1, cl2, sl1, sl2, cdelta, sdelta, x, y;
    user.obr.dist = 0;
    let len=0;
    for (let i = 1; user.date[i] != null; i++) {
      len++;
      let lat1 = user.latitude[i-1] * M_PI / 180;
      let lat2 = user.latitude[i] * M_PI / 180;
      let long1 = user.longitude[i-1] * M_PI / 180;
      let long2 = user.longitude[i] * M_PI / 180;
   
      cl1 = cos(lat1);
      cl2 = cos(lat2);
      sl1 = sin(lat1);
      sl2 = sin(lat2);
      cdelta = cos(long2 - long1);
      sdelta = sin(long2 - long1);
  
      y = sqrt(pow(cl2 * sdelta, 2) + pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
      x = sl1 * sl2 + cl1 * cl2 * cdelta;
   
      user.obr.dist += atan2(y, x) * 6372795;
    }
    user.obr.dist /= 1000;

    //max time
    let len2=0;
    while(user.obr.time[i] != null) len2++;
    user.obr.time[len2+1] = user.date[len] - user.date[0];

    //average time
    let at=0;
    for (let i = 1; user.obr.time[i] != null; i++) at += user.obr.time[i];
    user.obr.avtime = at/(len2+1);

    //the radius variation
    let maxlat = 0, minlat = 5, maxlon = 0, minlon = 5;
    for (let i = 0; user.latitude[i] != null; i++) {
      if (user.latitude[i] > maxlat) maxlat = user.latitude[i];
      if (user.latitude[i] < minlat) minlat = user.latitude[i];
      if (user.longitude[i] > maxlat) maxlat = user.longitude[i];
      if (user.longitude[i] < minlat) minlat = user.longitude[i];
    }
    user.obr.radvar = await sqrt(pow(maxlat-minlat,2)+pow(maxlon-minlon,2));

    //clear arrays
    (await function () {
      for (let i = 0; user.date[i] != null; i++) {
        user.date[i] = null;
        user.speed[i] = null;
        user.latitude[i] = null;
        user.longitude[i] = null;
      }
    })();

    await user.save();

  } catch (err) { valerr(res, err); console.error(err); }
}

export default router;