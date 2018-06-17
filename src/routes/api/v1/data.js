"use strict";
import path from 'path';
import express from 'express';
import User, {validator} from '../../../models/user';
import { dberr, ok, notFound, valerr } from '../../../helpers';
import jwt_decode from 'jwt-decode';
import jwt from 'jsonwebtoken';
const router = express.Router();

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3RPYmplY3RQb2ludHMiLCJfaWQiOiI1YjI1NzIxNjQyZDI1MTAwMjBkYzIyZTIiLCJpYXQiOjE1MjkxODUwNjksImV4cCI6MTUzMDA0OTA2OX0.ye4jFLKR64SOP1Cqx1cHXOemcUSyGcgP06F5AfPLer4

router.post('/change', async (req, res, next) => {
	jwt.verify(req.body.token, '5i39Tq2wX00PC0QEuA350vi7oDB2nnq3', async (err, token) => {
		if(err){
			res.status(500).send({
				status: 'error',
				message: 'Verify error',
				message2: err.message
		});
		}else{
			let user = null;
			try { //выношу из токена данные в user
				user = await User.findOne({ _id: token._id }).exec();
				if (!user) return notFound(res);
				let age = req.body.age, sex = req.body.sex, name = req.body.name,
					username = req.body.username, experience = req.body.experience, 
					country = req.body.country, city = req.body.city;
				if (age && age!=user.age) user.age = age; 
				if (sex && sex!=user.sex) user.sex = sex;
				if (name && name!=user.name) user.name = name; 
				if (username && username!=user.username) user.username = username;
				if (experience && experience!=user.experience) user.experience = experience; 
				if (country && country!=user.country) user.country = country; 
				if (city && city!=user.city) user.city = city; 
				console.log(user.username);
				await user.save(); //сохраняю
				return ok(res);
			} catch (err) { return dberr(res); }
		}
	});
});



/**
 * Вычисление возраста в годах по дате.
 */
function getCurrentAge(date) {
	return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
}

/**
 * Получение общей информации о пользователе.
 * 
 * @param token
 * @return общая информация о пользователе
 */
router.post('/', async (req, res, next) => {
	// проверка на валидность токена
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
				// выносим из токена данные в user
				user = await User.findOne({ _id: token._id }).exec();
				if (!user) return notFound(res);
				// вычисляем возраст в годах
				let years = getCurrentAge(user.age);
				// возвращаем ответ
				return res.status(200).send({
					status: 'ok',
					message: 'Data successfuly received',
					// общая информация
					age: years, // возраст в годах
					age2: user.age, // возраст в полной дате
					sex: user.sex,
					name: user.name,
					username: user.username,
					// то, что пользователь вводит сам
					experience: user.experience,
					country: user.country,
					city: user.city,
					// результаты обработки данных из obr
					max: user.obr.max,
					dist: user.obr.dist,
					avtime: user.obr.avtime,
					radvar: user.obr.radvar,
					date: user.obr.date,
					type: user.obr.type
				});
			} catch (err) { return dberr(res); }
		}
	});
});

/**
 * Получение клиентом информации из track
 * 
 * @param token
 * @return строка с dateTrack, startTime, stopTime
 */
router.post('/getDate', async (req, res, next) => {
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
				// собираем строку
				// let str = '[';
				// for (var k = 1; user.track.dateTrack[k] != null; k++);
				// for (let i = k - 1; i >= 0; i--)
				// 	str += `{dateTrack:"${user.track.dateTrack[i]}",StartTime:"${user.track.startTime[i]}",StopTime:"${user.track.stopTime[i]}"};`;
				// 	str = str.slice(0, -1);
				// str += ']';
				// собираем объект
				let str = [];
				//for (var k = 1; user.track.dateTrack[k] != null; k++);
				for (let i = user.track.dateTrack.length - 1; i >= 0; i--)
					str.push({
						"dateTrack": user.track.dateTrack[i],
						"StartTime": user.track.startTime[i],
						"StopTime": user.track.stopTime[i]});
				// возвращаем ответ
				return res.status(200).send({
					status: 'ok',
					message: 'Date successfuly received',
					str: str
				});
			} catch (err) { return dberr(res); }
		}
	});
});

/**
 * Получение points
 * 
 * @param token
 * @param dateTrack
 * @param StartTime
 * @return points
 */
router.post('/getPoints', async (req, res, next) => {
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
		
				let dateTrack = req.body.dateTrack, 
					startTime = req.body.StartTime;
				console.log(dateTrack + " "+startTime);
				// ищем нужный трек
				let point = user.track.points.filter((track, i) => 
					dateTrack == user.track.dateTrack[i] && startTime == user.track.startTime[i]);
				// возвращаем ответ (если трека нет, пустой элемент (вроде, массив))
				return res.status(200).send({
					status: 'ok',
					message: 'Date successfuly received',
					points: point
				});
				// это теперь не надо
				// return res.status(404).send({
				// 	status: 'error',
				// 	message: 'Date not found'
				// });
			} catch (err) { return dberr(res); }
		}
	});
});

/**
 * @module Для админки.
 * @see module: Получение данных о всех пользователях
 */

/**
 * Upload a file.
 *
 * @name Получение данных о всех пользователях
 * @route {POST} /all
 */
router.post('/all', async (req, res, next) => {
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
				if (user.username != "admin0" && user.username != "id136955296")
					return res.status(404).send({
						status: 'error',
						message: 'User is not admin'
					});
				var all = await User.find({}).exec();
				return res.status(200).send({
					status: 'ok',
					message: 'Data successfuly received',
					all: all
				});

			} catch (err) { return dberr(res); }
		}
	});
});

/**
 * Изменение данных в админке (вход по паролю админа).
 * 
 * @param token - токен admin0
 * @param nameOfPar - имя свойства, которое надо изменить
 * @param data - новое значение свойства
 * @param usernameAuth - username, у которого изменить свойство
 * @return только status и message
 */
router.post('/changeAdmin', async (req, res, next) => {
	// проверка на валидность токена
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
				// выносим из токена данные в user
				user = await User.findOne({ _id: token._id }).exec();
				if (!user) return notFound(res);
				// выясняем, является ли юзер админом
				if (user.username != "admin0")
					return res.status(404).send({
						status: 'error',
						message: 'User is not admin'
					});
				var	userChange = await User.findOne({ username: req.body.usernameAuth }).exec(),
					par = req.body.nameOfPar, 
					data = req.body.data;
				// находим свойства, которые надо изменить
				// без этой строки не работает, загадка для меня 
				// https://github.com/Automattic/mongoose/issues/3891
				let userC = userChange.toObject();
				// критерии поиска
				// 1. имя свойства равно имени из req.body
				// 2. значение в свойстве новое, т.е. не равно req.body.data
				(Object.keys(userC)).forEach(key => {
					if (par == key && data != userChange[key])
						userChange[key] = data;	
				});
				// сохраняем в бд
				await userChange.save();
				// возвращаем ответ
				return res.status(200).send({
					status: 'ok',
					message: 'Data successfuly changed'
				});
			} catch (err) { return dberr(res); }
		}
	});
});

export default router;