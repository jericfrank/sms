import winston from 'winston'
import 'winston-daily-rotate-file'

const transport = new winston.transports.DailyRotateFile({
	filename: './log',
	datePattern: 'yyyy-MM-dd.',
	prepend: true,
	level: 'debug'
})

const logger = new (winston.Logger)({
	transports: [
	  transport
	]
})

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
}

export default logger
