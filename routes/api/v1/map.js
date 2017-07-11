"use strict";
import path from 'path';
import express from 'express';
import User from '../../../models/user';
import Uservk from '../../../models/uservk';
import { dberr } from '../../../helpers';
import jwt_decode from 'jwt-decode';
const router = express.Router();

router.post('/pos', async (req, res, next) => {
  let token = jwt_decode(req.body.token);
  let user = null, uservk = null;
  try {
    user = await User.findOne({ _id: token._id }).exec();
    uservk = await Uservk.findOne({ _id: token._id }).exec();
    if (!user && !uservk) return res.status(404).send({
      status: 'error',
      message: 'User not found'
    });
  } catch (err) { return dberr(res); }
  try {
    if (!req.body.shirota) return res.status(400).send({
      status: 'error',
      message: "Shirota is required"
    });
    if (!req.body.dolgota) return res.status(400).send({
      status: 'error',
      message: "Dolgota is required"
    });
    if (!(typeof (req.body.shirota) === "number")) return res.status(400).send({
      status: 'error',
      message: "Shirota must be an number"
    });
    if (!(typeof (req.body.dolgota) === "number")) return res.status(400).send({
      status: 'error',
      message: "Dolgota must be an number"
    });
  } catch (err) { dberr(res); }

  if (user) try {
    User.update( user.username, { $push: { shirota: req.body.shirota, dolgota: req.body.dolgota } }, function (err) { });
    return res.status(200).send({
      status: 'ok',
      message: 'User successfuly changed'
    });
  } catch (err) { dberr(res); }
  else try {
    User.update( uservk.idvk, { $push: { shirota: req.body.shirota, dolgota: req.body.dolgota } }, function (err) { });
    return res.status(200).send({
      status: 'ok',
      message: 'User successfuly changed'
    });
  } catch (err) { dberr(res); }
});

export default router;