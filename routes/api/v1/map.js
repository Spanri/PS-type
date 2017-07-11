"use strict";
import path from 'path';
import express from 'express';
import User from '../../../models/user';
import Uservk from '../../../models/uservk';
import { dberr } from '../../../helpers';
const router = express.Router();

router.post('/vkpos', async (req, res, next) => {
let uservk = null;
try {
    uservk = await Uservk.findOne({ idvk: req.body.idvk }).exec();
    if (!uservk) return res.status(404).send({
      status: 'error',
      message: 'User not found'
    });
  } catch (err) { return dberr(res); }
try{
    if (!req.body.shirota) return res.status(400).send({
        status: 'error',
        message: "Shirota is required"
      });
    if (!req.body.dolgota) return res.status(400).send({
        status: 'error',
        message: "Dolgota is required"
      });
    if (!(typeof(req.body.shirota) === "number")) return res.status(400).send({
        status: 'error',
        message: "Shirota must be an number"
      });
    if (!(typeof(req.body.dolgota) === "number")) return res.status(400).send({
        status: 'error',
        message: "Dolgota must be an number"
      });
    User.update({idvk: req.body.idvk},{ $push:{shirota: req.body.shirota, dolgota: req.body.dolgota}},function(err){});
    return res.status(200).send({
        status: 'ok',
        message: 'User successfuly changed'
    });
} catch(err) { dberr(res); }
});

router.post('/pos', async (req, res, next) => {
let user = null;
try {
    user = await User.findOne({ username: req.body.username }).exec();
    if (!user) return res.status(404).send({
      status: 'error',
      message: 'User not found'
    });
  } catch (err) { return dberr(res); }
try{
    if (!req.body.shirota) return res.status(400).send({
        status: 'error',
        message: "Shirota is required"
      });
    if (!req.body.dolgota) return res.status(400).send({
        status: 'error',
        message: "Dolgota is required"
      });
    if (!(typeof(req.body.shirota) === "number")) return res.status(400).send({
        status: 'error',
        message: "Shirota must be an number"
      });
    if (!(typeof(req.body.dolgota) === "number")) return res.status(400).send({
        status: 'error',
        message: "Dolgota must be an number"
      });
    User.update({username: req.body.username},{ $push:{shirota: req.body.shirota, dolgota: req.body.dolgota}},function(err){});
    return res.status(200).send({
        status: 'ok',
        message: 'User successfuly changed'
    });
} catch(err) { dberr(res); }
});

export default router;