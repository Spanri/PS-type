"use strict";
import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Datastore from 'nedb';

import index from './routes/index';
import api from './routes/api';

const app = express();

// create dbs
const usersDb = new Datastore({
  filename: 'users.nedb',
  autoload: true,
  onload: err => {
    err
      ? console.error(err)
      : console.log('Users db created');
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

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

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
