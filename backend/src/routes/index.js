"use strict";
import express from 'express';
import expressOrig from 'express';
import api from './api';
// import * as a from '../../dist';
import path from 'path';

const router = express.Router();

/** @see module:Глобальные методы */
/** @module Глобальные методы */

/**
 * Общая информация о сервере и проекте + версия.
 * @name Общая информация
 * @route {GET} /
 */

router.use('/api', api);

var serveStatic = require('serve-static')
router.use('/', serveStatic(__dirname + "../../../dist"));
router.use('/assets', serveStatic(__dirname + "../../../dist/css"));

// router.use('/static', express.static(__dirname + '/dist'))

// router.get('/m', (req, res) => {
//   res.sendFile(path.join(__dirname + '../../../dist/index.html'));
// });

// router.use('/static', expressOrig.static(path.join(__dirname + '../../../dist/static')))

// router.get('/', (req, res, next) => {
//   res.json({
//     name: "PSType API",
//     madeBy: "Anna, Valya",
//     versionOfServer: "0.1.1",
//     versionOfClient: "0.0.1"
//   });
// });

export default router;
