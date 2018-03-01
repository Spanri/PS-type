"use strict";
import path from 'path';
import express from 'express';
import User, {validator} from '../../../models/user';
import { dberr, ok, notFound, valerr } from '../../../helpers';
import jwt_decode from 'jwt-decode';
import jwt from 'jsonwebtoken';
const router = express.Router();

//cfnbgb

//отправить данные акселерометра
router.post('/get', async (req, res, next) => {
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

//принять данные акселерометра
router.post('/set', async (req, res, next) => {
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
          
          await User.update({ _id: user._id }, {
            $push: {
                'accel.x': { $each: [req.body.x] },
                'accel.y': { $each: [req.body.y] },
                'accel.z': { $each: [req.body.z] },
                'accel.lon': { $each: [req.body.lon] },
                'accel.lat': { $each: [req.body.lat] },
                'accel.time': { $each: [req.body.time] },
                'accel.date': { $each: [req.body.date] },
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

export default router;