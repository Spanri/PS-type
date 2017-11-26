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
    if(err){
      res.status(500).send({
        status: 'error',
        message: 'Verify error',
        message2: err.message
    });
    } else {
      let token = decoded;
      let user = null, uservk = null;
      try {
        user = await User.findOne({ _id: token._id }).exec();
        uservk = await Uservk.findOne({ _id: token._id }).exec();
        if (!user && !uservk) return notFound(res);
      } catch (err) { return dberr(res); }
      if (user) try {
        await User.update({ _id: user._id }, {
          $push: {
            'a.latitude': { $each: [req.body.latitude] },
            'a.longitude': { $each: [req.body.longitude] },
            'a.speed': { $each: [req.body.speed] },
            'a.date': { $each: [req.body.date] }
          }
        });
        return res.status(200).send({
          status: 'ok',
          message: 'Data successfuly processed'
        });
      } catch (err) { valerr(res, err); }
      else try {
        await Uservk.update({ _id: uservk._id }, {
          $push: {
            'a.latitude': { $each: [req.body.latitude] },
            'a.longitude': { $each: [req.body.longitude] },
            'a.speed': { $each: [req.body.speed] },
            'a.date': { $each: [req.body.date] }
          }
        });
        return res.status(200).send({
          status: 'ok',
          message: 'Data successfuly processed'
        });
      } catch (err) { valerr(res, err); }}
  });
});

async function obr(res, user) {
  try{
    //max speed
    user.a.obr.max = await Math.max.apply( Math, user.a.speed );
    if(user.a.obr.max > 100) user.a.obr.type = "Лихач";
    else if(user.a.obr.max < 40) user.a.obr.type = "Черепашка";
    else user.a.obr.type = "Обычный человек";

    //max dist
    let cl1, cl2, sl1, sl2, cdelta, sdelta, x, y;
    user.a.obr.dist = 0;
    let len=0;
    for (let i = 1; user.a.date[i] != null; i++) {
      len++;
      let lat1 = user.a.latitude[i-1] * M_PI / 180;
      let lat2 = user.a.latitude[i] * M_PI / 180;
      let long1 = user.a.longitude[i-1] * M_PI / 180;
      let long2 = user.a.longitude[i] * M_PI / 180;
   
      cl1 = cos(lat1);
      cl2 = cos(lat2);
      sl1 = sin(lat1);
      sl2 = sin(lat2);
      cdelta = cos(long2 - long1);
      sdelta = sin(long2 - long1);
  
      y = sqrt(pow(cl2 * sdelta, 2) + pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
      x = sl1 * sl2 + cl1 * cl2 * cdelta;
   
      user.a.obr.dist += atan2(y, x) * 6372795;
    }
    user.a.obr.dist /= 1000;

    //max time
    let len2=0;
    while(user.a.obr.time[i] != null) len2++;
    user.a.obr.time[len2+1] = user.a.date[len] - user.a.date[0];

    //average time
    let at=0;
    for (let i = 1; user.a.obr.time[i] != null; i++) at += user.a.obr.time[i];
    user.a.obr.avtime = at/(len2+1);

    //the radius variation
    let maxlat = 0, minlat = 5, maxlon = 0, minlon = 5;
    for (let i = 0; user.a.latitude[i] != null; i++) {
      if (user.a.latitude[i] > maxlat) maxlat = user.a.latitude[i];
      if (user.a.latitude[i] < minlat) minlat = user.a.latitude[i];
      if (user.a.longitude[i] > maxlat) maxlat = user.a.longitude[i];
      if (user.a.longitude[i] < minlat) minlat = user.a.longitude[i];
    }
    user.a.obr.radvar = sqrt(pow(maxlat-minlat,2)+pow(maxlon-minlon,2));

    //clear arrays
    (await function () {
      for (let i = 0; user.a.date[i] != null; i++) {
        user.a.date[i] = null;
        user.a.speed[i] = null;
        user.a.latitude[i] = null;
        user.a.longitude[i] = null;
      }
    })();

    await user.save();

    return ok(res);
  } catch (err) { valerr(res, err); console.error(err); }
}

router.post('/obr', async (req, res, next) => {
  jwt.verify(req.body.token, '5i39Tq2wX00PC0QEuA350vi7oDB2nnq3', async (err, decoded) => {
    if(err){
      res.status(500).send({
        status: 'error',
        message: 'Verify error',
        message2: err.message
    });
    } else {
      let token = decoded;
      let user = null, uservk = null;
      try {
        user = await User.findOne({ _id: token._id }).exec();
        uservk = await Uservk.findOne({ _id: token._id }).exec();
        if (!user && !uservk) return notFound(res);
      } catch (err) { return dberr(res); }
      if (user) obr(res, user);
      else obr(res, uservk);
    }
  });
});

export default router;