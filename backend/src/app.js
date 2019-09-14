import http from 'http'
import { env, mongo, port, ip, apiRoot, masterKey } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import ejwt from 'express-jwt';
import path from 'path';
import api from './routes'

const app = express(apiRoot, api)
const server = http.createServer(app)

mongoose.connect(mongo.uri)
mongoose.Promise = Promise

app.set('secret', masterKey);

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
