import 'dotenv/config'

module.exports = {
	'server': `${process.env.APP_HOST}:${process.env.APP_PORT}`,
	'node_env': process.env.NODE_ENV,
	'host': process.env.APP_HOST,
	'port': process.env.APP_PORT,
	'socket_port': process.env.SOCKET_PORT,
    'secret': process.env.APP_SECRET,
    'database': process.env.MONGO_URL,
    'twilio': {
    	'sid': process.env.TWILIO_SID,
    	'token': process.env.TWILIO_TOKEN,
    	'number': process.env.TWILIO_NUMBER
    },
    'versions': ['v1','v2']
}
