"use strict";
import path from 'path';
import express from 'express';
import User from '../../../models/user';
import Uservk from '../../../models/uservk';
import { dberr, ok, notFound, valerr } from '../../../helpers';
import jwt_decode from 'jwt-decode';
const router = express.Router();

router.post('/pos', async (req, res, next) => {
  let token = jwt_decode(req.body.token);
  let user = null, uservk = null;
  try {
    user = await User.findOne({ _id: token._id }).exec();
    uservk = await Uservk.findOne({ _id: token._id }).exec();
    if (!user && !uservk) return notFound(res);
  } catch (err) { return dberr(res); }
  if (user) try {
    await User.update({ _id: user._id }, {$push: {
      latitude: { $each: [req.body.latitude], $slice: 500 },
      longitude: { $each: [req.body.longitude], $slice: 500 },
      speed: { $each: [req.body.speed], $slice: 500 }
    }});
    return res.status(200).send({
      status: 'ok',
      message: 'Data successfuly processed'
    }); 
  } catch (err) { valerr(res, err); }
  else try {
    await User.update({ _id: uservk._id }, {$push: {
      latitude: { $each: [req.body.latitude], $slice: 500 },
      longitude: { $each: [req.body.longitude], $slice: 500 },
      speed: { $each: [req.body.speed], $slice: 500 }
    }});
    return res.status(200).send({
      status: 'ok',
      message: 'Data successfuly processed'
    }); 
  } catch (err) { valerr(res, err); }
});

async function obr(res, user) {
  try{
    //max speed
    user.obr.max = await Math.max.apply( Math, user.speed );

    // max distance(from book "Preparata, Sheimos "Computational geometry: Introduction")
    // var max = Math.max.apply( Math, user.latitude );
    // console.log(max);
    // var min = Math.min.apply( Math, user.latitude );
    // console.log(min);
    // //index of latitude
    // var imax = user.latitude.indexOf(max);
    // var imin = user.latitude.indexOf(min);
    // //distance of lat and long
    // var lat = max - min;
    // var lon = user.longitude[imax] - user.longitude[imin];
    // //max dist
    // user.obr.dist = Math.sqrt( lat*lat + lon*lon );

    await user.save();
    return ok(res);
  } catch (err) { valerr(res, err); console.error(err); }
}

router.post('/obr', async (req, res, next) => {
  let token = jwt_decode(req.body.token);
  let user = null, uservk = null;
  try {
    user = await User.findOne({ _id: token._id }).exec();
    uservk = await Uservk.findOne({ _id: token._id }).exec();
    if (!user && !uservk) return notFound(res);
  } catch (err) { return dberr(res); }
  if (user) obr(res, user);
  else obr(res, uservk);
});

export default router;