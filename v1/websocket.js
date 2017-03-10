import Primus from 'primus'
import Emit from 'primus-emit'

import Messages from './models/messages'

export default (server) => {
	let primus = new Primus(server, { transformer: 'engine.io' })

	primus.plugin('emit', Emit)

	primus.on("connection", (spark) => {

		spark.on('v1:messages', function custom(data, another, arg) {

			Messages.getByField({ messageId: data.messageId }).then((docs) => {
		    	this.emit('v1:messages', docs);
			}).catch( (err) => {
				this.emit('v1:messages', err)
			})

		})
	})
}
