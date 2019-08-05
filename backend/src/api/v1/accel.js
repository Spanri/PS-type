"use strict";
import path from 'path';
import express from 'express';
import User from '../../models/user';
import { dberr, ok, notFound, valerr } from '../../helpers';
import jwt from 'jsonwebtoken';
const router = express.Router();

/** @see module:api/v1/accel/* */
/** @module api/v1/accel/* */

/**
 * Занесение данных об акселерометре в бд.
 *
 * @name Accel в бд
 * @route {POST} /set
 * @queryparam {String} token Токен
 */
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
        try { //выносим из токена данные в user
          user = await User.findOne({ _id: token._id }).exec();
          if (!user) return notFound(res);
          //заносим данные в user.accel
          await User.update({ _id: user._id }, {
            $push: {
                'accel.x': { $each: [req.body.x] },
                'accel.y': { $each: [req.body.y] },
                'accel.z': { $each: [req.body.z] },
                'accel.lon': { $each: [req.body.lon] },
                'accel.lat': { $each: [req.body.lat] },
                'accel.time': { $each: [req.body.time] },
                'accel.date': { $each: [req.body.date] },
                'accel.type': { $each: [req.body.type] },
              }
          });
          //если всё хорошо
          return res.status(200).send({
            status: 'ok',
            message: 'Data successfuly processed'
          });
        //если плохо
        } catch (err) { return dberr(res); }
      }
    });
});

export default router;
