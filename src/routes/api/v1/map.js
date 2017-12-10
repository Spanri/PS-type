"use strict";
import path from 'path';
import express from 'express';
import User from '../../../models/user';
import { dberr, ok, notFound, valerr } from '../../../helpers';
import jwt_decode from 'jwt-decode';
import jwt from 'jsonwebtoken';
const router = express.Router();

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
        await obr(res, user);
        return ok(res);
      } catch (err) { return dberr(res); }
    }
  });
});

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