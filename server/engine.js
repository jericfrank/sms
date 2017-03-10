import twilio from 'twilio'
import config from '../config/development'

export default new twilio.RestClient( config.twilio.sid , config.twilio.token)
