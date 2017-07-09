"use strict";
import express from 'express';
import auth from './auth';
import change from './change';
const router = express.Router();

router.use('/', auth);
router.use('/change', change);

router.get('/', (req, res, next) => {
  res.json({
    name: "PS Type API",
    version: "1.0",
    docs: 'https://github.com/Spanri/pstype'
  });
});

export default router;
