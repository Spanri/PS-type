"use strict";
import path from 'path';
import express from 'express';
import User, {validator} from '../../../models/user';
import Uservk from '../../../models/uservk';
import { dberr, catchErr } from '../../../helpers';
import jwt_decode from 'jwt-decode';
const router = express.Router();

//токены для запросов в постмане, пользователи asdfgh
//vk "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHZrIjoiYXNkZmdoIiwiX2lkIjoiNTk2NTNjYzM2NzA5MzExOTQ0YzRhZjlmIiwiaWF0IjoxNDk5ODA2OTE2LCJleHAiOjE1MDA2NzA5MTZ9.a1tV8GwWQhtzZ89F3kkNYLlRoE10VbOx8MkMxjTGDFU"
//"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFzZGZnaCIsIl9pZCI6IjU5NjUzZWE1NjcwOTMxMTk0NGM0YWZhMCIsImlhdCI6MTQ5OTgwNzM5NywiZXhwIjoxNTAwNjcxMzk3fQ.Ww4xxFd65Oez0hVPED4mH4NaiVn9IeD8Hl0DckjEdJY"

router.post('/', async (req, res, next) => {
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

  if (req.body.age) if (req.body.age < 14)
    return res.status(400).send({
      status: 'error',
      message: 'Age must be >=14'
    }); else if (req.body.age > 110)
    return res.status(400).send({
      status: 'error',
      message: 'Age must be <=110'
    });
  if (req.body.sex) if (!(typeof (req.body.sex) === "boolean"))
    return res.status(400).send({
      status: 'error',
      message: 'Sex must be boolean (true for male)'
    });

  if (user) try {
    if (req.body.age) User.update(user.username, { $set: { age: req.body.age } }, function (err) { });
    if (req.body.sex) User.update(user.username, { $set: { sex: req.body.sex } }, function (err) { });
    return res.status(200).send({
      status: 'ok',
      message: 'User successfuly changed'
    });
  } catch (err) { return dberr(res); }
  else try {
    if (req.body.age) Uservk.update(uservk.idvk, { $set: { age: req.body.age } }, function (err) { });
    if (req.body.sex) Uservk.update(uservk.idvk, { $set: { sex: req.body.sex } }, function (err) { });
    return res.status(200).send({
      status: 'ok',
      message: 'User successfuly changed'
    });
  } catch (err) { return dberr(res); }
});

export default router;