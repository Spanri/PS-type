import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import ejwt from 'express-jwt';
import path from 'path';
import api from './routes'

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

app.use(serveStatic(path.join(__dirname, 'dist')))

mongoose.connect(mongo.uri)
mongoose.Promise = Promise

// app.set('a', path.join(__dirname, 'dist'));
app.set('secret', requireProcessEnv('SECRET_KEY'));

// app.use(express.static('public'));
// app.use('/static', express.static(__dirname + '/dist'))
// app.use(express.static(path.join(__dirname, '/dist')));

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
