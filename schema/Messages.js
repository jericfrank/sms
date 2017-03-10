import DB from './DB'
import mongoose from 'mongoose'
import bluebird from 'bluebird'
import timestamps from 'mongoose-timestamp'
import softdelete from 'mongoose-delete'

mongoose.Promise = bluebird.Promise

const Schema = mongoose.Schema;
const MessagesSchema = new Schema({
    to: String,
    from: String,
    body: String,
    usersId: Number,
    messageId: String
})

MessagesSchema.plugin(timestamps)
MessagesSchema.plugin(softdelete , { overrideMethods: true })

export default DB.model('messages', MessagesSchema)
