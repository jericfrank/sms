import DB from './DB'
import mongoose from 'mongoose'
import bluebird from 'bluebird'
import timestamps from 'mongoose-timestamp'
import softdelete from 'mongoose-delete'

mongoose.Promise = bluebird.Promise

const Schema = mongoose.Schema;
const UsersSchema = new Schema({
    name: String,
    email: String,
    password: String,
    admin: Boolean,
    key: String
})

UsersSchema.plugin(timestamps)
UsersSchema.plugin(softdelete , { overrideMethods: true })

export default DB.model('users', UsersSchema)
