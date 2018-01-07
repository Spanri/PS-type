"use strict";
import express from 'express';
const router = express.Router();

//common information about server and project
router.get('/', (req, res, next) => {
  res.json({
    name: "PSType API",
    madeBy: "Anna, Valya",
    versionOfServer: "0.1.1",
    versionOfClient: "0.0.1"
  });
});

export default router;