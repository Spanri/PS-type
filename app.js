"use strict";
import express from 'express';
import path from 'path';
import fs from 'fs';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import ejwt from 'express-jwt';
import mongoose from 'mongoose';
import index from './routes/index';
import api from './routes/api';
//import {utils} from "vue-strap";

// "babel-cli": "^6.11.4",
// "babel-preset-es2015": "^6.24.1",
// "babel-preset-stage-0": "^6.11.0",
// "babel-register": "^6.11.6",
// "start": "nodemon ./bin/www --exec babel-node --presets es2015,stage-0 --exitcrash",

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://SpanriDb:nysha2161@ds046939.mlab.com:46939/spanridb');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('DB connected!'));

const app = express();

app.set('secret', '5i39Tq2wX00PC0QEuA350vi7oDB2nnq3');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(ejwt({
  secret: app.get('secret')
}).unless({
  method: 'OPTIONS',
  path: [
    '/',
    /\/api\/v\d(\/sign(in|up))?\/?/i
  ]
}));

app.use('/', index);
app.use('/api', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).send({
    status: 'error',
    message: err.message || 'Server error'
  });
});

module.exports = app;