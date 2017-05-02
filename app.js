"use strict";
import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import ejwt from 'express-jwt';

import index from './routes/index';
import api from './routes/api';

const app = express();

app.set('salt rounds', 10);
app.set('secret', '5i39Tq2wX00PC0QEuA350vi7oDB2nnq3');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(ejwt({
  secret: app.get('secret')
}).unless({
  path: [/.*api\/v\d\/sign(in|up).*/, '/']
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