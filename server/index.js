import express from 'express'
import path from 'path'
import morgan from 'morgan'
import fs from 'fs'
import compression from 'compression'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import http from 'http'

import logger from './logger'
import websocket from './sockets'
import middleware from './middleware'
import config from '../config/development'
import routes from './routes'

const app = express()
const server = http.createServer(app)

/*
* body-parser
*
* support json encoded bodies
* support encoded bodies
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('METHOD :method URL :url STATUS :status RESPONSE_TIME :response-time[digits]', {stream: logger.stream}))
app.use(compression())
app.use(helmet())
app.use(cors())
// app.options('*', cors())

if (config.node_env == 'production') {
	app.use( (req, res, next) => {
		if (req.headers['x-forwarded-proto'] != 'https'){
			return res.redirect(['https://', req.get('Host'), req.url].join(''));
		}
		return next()
	})
}

app.get('/', function(req, res) {
	res.send(`SMS Microservice`)
})

app.use('/api', middleware, routes)
app.use( express.static(path.join( __dirname + '/../public')) )

websocket(server)

server.listen( config.port || 3000 , () => {
		console.log('Running server at %s:%s', config.host, config.port)
		logger.info('Start Server...')
	})
	.on('error', (err) => {
		if(err.errno == 'EADDRINUSE'){
			console.log('Theres someone using this port %s', config.port)
			logger.error(err)
		}
	})
