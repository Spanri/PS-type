"use strict";
import express from 'express';
import User from '../../../models/user';
import jwt from 'jsonwebtoken';
import { dberr, notFound } from '../../../helpers';
const router = express.Router();

/** @see module:api/v1/* */
/** @module api/v1/* */

/**
 * Взять токен, время жизни - 10 дней, secret смотреть в app.js. Нужна для route "/signup"
 *
 * @function
 * @name Генерация токена
 * @param {} req - require, для обработки
 * @param {} payload - чето
 */
const getToken = (req, payload) => jwt.sign(payload, req.app.get('secret'), {
  expiresIn: '10d'
});

/**
 * Валидация пароля, условия в models/user.js. Нужна для route "/signup".
 *
 * @function
 * @name Проверка пароля
 * @param {} user - пользователь, пароль которого проверяем
 * @param {} password - пароль, который проверяется
 */
const verifyPassword = (user, password) => new Promise((resolve, reject) => {
   user.verifyPassword(password, (err, isValid) => {
     if (err) reject(err);
     else if (!isValid) reject(new Error('Invalid password'));
     else resolve();
   });
});

/**
 * Регистрация нового пользователя. Возвращает токен и
 * информацию о созданном пользователе.
 *
 * @name Регистрация
 * @route {POST} /signup
 * @queryparam {String} username Имя пользователя
 * @queryparam {String} password Пароль
 * @queryparam {Number} [age] Возраст
 * @queryparam {String} [sex] Пол
 * @queryparam {String} [name] Имя
 * @queryparam {String} [experience] Опыт
 * @queryparam {String} [country] Страна
 * @queryparam {String} [city] Город
 * @queryparam {Number} [max] Максимальная скорость
 * @queryparam {Number} [dist] Максимальная дистанция
 * @queryparam {Date} [time] Максимальное время
 * @queryparam {Date} [avtime] Среднее время
 * @queryparam {Number} [radvar] radius variation
 * @queryparam {Date} [date] Дата
 * @queryparam {String} [type] Тип
 */
router.post('/signup', async (req, res, next) => {
  // create object with info about user
  const userToCreate = {
    username: req.body.username,
    password: req.body.password,
    age: req.body.age,
    sex: req.body.sex,
    name: req.body.name,
    experience: req.body.experience,
    country: req.body.country,
    city: req.body.city
  };
  try {
    const user = await User.create(userToCreate);
    const payload = { username: user.username, _id: user._id };
    return res.status(200).send({
      status: 'ok',
      message: 'User successfuly created',
      user: payload,
      token: getToken(req, payload)
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const firstErr = err.errors[Object.keys(err.errors)[0]];
      let message = 'Unexpected error';
      if (firstErr.kind === 'unique') message = 'User with this username already exists';
      else if (firstErr.message) message = firstErr.message;
      return res.status(400).send({
        status: 'error',
        message
      });
    }
    else return dberr(res);
  }
});

/**
 * Аутентифицирует пользователя, возвращает статус
 * приветствия и токен. Токен валиден 10 дней. Нагрузка
 * содержит имя пользователя и его ИД.
 *
 * @name Авторизация
 * @route {POST} /signin
 * @queryparam {String} username Имя пользователя
 * @queryparam {String} password Пароль
 */
router.post('/signin', async (req, res, next) => {
  let user = null;
  try {
    user = await User.findOne({ username: req.body.username }).exec();
    if (!user) return notFound(res);
    await verifyPassword(user, req.body.password);
  } catch (err) {
    if (err.message === 'Invalid password') return res.status(400).send({
      status: 'error',
      message: 'Wrong password'
    });
    else return dberr(res);
  }
  const payload = { username: user.username, _id: user._id };
  return res.status(200).send({
    status: 'ok',
    message: 'User successfuly authorized',
    token: getToken(req, payload)
  });
});

export default router;
