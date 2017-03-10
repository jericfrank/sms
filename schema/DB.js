import mongoose from 'mongoose'
import config from '../config/development'

const uri = config.database

mongoose.connect( uri , (err, db) => {
	if (err) throw err
	console.log('Database connected');
})

export default mongoose