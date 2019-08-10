import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import expressOrig from 'express';
import ejwt from 'express-jwt';
import path from 'path';
import api from './routes'
// var history = require('connect-history-api-fallback');

var serveStatic = require('serve-static')

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

const app = express(apiRoot, api)
const server = http.createServer(app)

// app.use(history());
app.use(expressOrig.static('../dist'));

// app.use(serveStatic(path.join(__dirname + '../dist/static')));

mongoose.connect(mongo.uri)
mongoose.Promise = Promise

// app.set('a', path.join(__dirname, 'dist'));
app.set('secret', requireProcessEnv('SECRET_KEY'));

// app.use(express.static('public'));
// app.use('/static', express.static(__dirname + '../dist/static'))


// app.use(ejwt({
//   secret: app.get('secret')
// }).unless({
//   method: 'OPTIONS',
//   path: [
//     '/',
//     /\/api\/v\d(\/sign(in|up))?\/?/i
//   ]
// }));

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default app
