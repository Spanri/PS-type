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

export default router;
