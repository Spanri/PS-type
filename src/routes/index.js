"use strict";
import express from 'express';
const router = express.Router();

//common information about server and project
router.get('/', (req, res, next) => {
  res.json({
    name: "PS Type API",
    madeBy: "Anna, Valya"
  });
});

export default router;