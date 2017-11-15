"use strict";

import path from 'path';
import express from 'express';
import User from '../../../models/user';
import Uservk from '../../../models/uservk';
import { dberr, ok, notFound, valerr } from '../../../helpers';
import jwt_decode from 'jwt-decode';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/pos', async (req, res, next) => {
  jwt.verify(req.body.token, '5i39Tq2wX00PC0QEuA350vi7oDB2nnq3', async (err, decoded) => {
    if (err) {
      res.status(500).send({
        status: 'error',
        message: 'Verify error',
        message2: err.message
      });
    } else {
      let token = decoded;
      let user = null,
          uservk = null;
      try {
        user = await User.findOne({ _id: token._id }).exec();
        uservk = await Uservk.findOne({ _id: token._id }).exec();
        if (!user && !uservk) return notFound(res);
      } catch (err) {
        return dberr(res);
      }
      if (user) try {
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
      } catch (err) {
        valerr(res, err);
      } else try {
        await Uservk.update({ _id: uservk._id }, {
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
      } catch (err) {
        valerr(res, err);
      }
    }
  });
});

async function obr(res, user) {
  try {
    //max speed
    user.obr.max = await Math.max.apply(Math, user.speed);
    if (user.obr.max > 100) user.obr.type = "Лихач";else if (user.obr.max < 40) user.obr.type = "Черепашка";else user.obr.type = "Обычный человек";

    //max dist
    let ddate, dspeed;
    user.obr.dist = 0;
    for (let i = 1; user.date[i] != null; i++) {
      ddate = user.date[i] - user.date[i - 1];
      dspeed = user.speed[i] - user.speed[i - 1];
      user.obr.dist += ddate * dspeed;
    }

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

    return ok(res);
  } catch (err) {
    valerr(res, err);console.error(err);
  }
}

router.post('/obr', async (req, res, next) => {
  jwt.verify(req.body.token, '5i39Tq2wX00PC0QEuA350vi7oDB2nnq3', async (err, decoded) => {
    if (err) {
      res.status(500).send({
        status: 'error',
        message: 'Verify error',
        message2: err.message
      });
    } else {
      let token = decoded;
      let user = null,
          uservk = null;
      try {
        user = await User.findOne({ _id: token._id }).exec();
        uservk = await Uservk.findOne({ _id: token._id }).exec();
        if (!user && !uservk) return notFound(res);
      } catch (err) {
        return dberr(res);
      }
      if (user) obr(res, user);else obr(res, uservk);
    }
  });
});

export default router;