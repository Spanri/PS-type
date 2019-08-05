"use strict";
import express from 'express';
import auth from './auth';
import data from './data';
import map from './map';
import accel from './accel';
const router = express.Router();

router.use('/', auth);
router.use('/data', data);
router.use('/map', map);
router.use('/accel', accel);

router.get('/', (req, res, next) => {
  res.json({
    name: "PS Type API",
    version: "1.0",
    docs: 'https://github.com/Spanri/pstype'
  });
});

export default router;
