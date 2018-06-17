"use strict";
import express from 'express';
const router = express.Router();

/** @see module:Глобальные методы */
/** @module Глобальные методы */

/**
 * Общая информация о сервере и проекте + версия.
 * @name Общая информация
 * @route {GET} /
 */
router.get('/', (req, res, next) => {
  res.json({
    name: "PSType API",
    madeBy: "Anna, Valya",
    versionOfServer: "0.1.1",
    versionOfClient: "0.0.1"
  });
});

export default router;