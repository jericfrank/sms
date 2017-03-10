import Messages from '../../schema/Messages'
import Model from './model'

class MessagesModel extends Model {

	constructor() {
		super()
	}

	get(){
		return Messages.find().then( (docs) => {
			return docs
	  	})
	}

	getByField(obj){
		return Messages.find(obj).then( (docs) => {
			return docs
	  	})
	}

  	create(request) {
  		const data = new Messages({
  			to: request.to,
		    from: '+15034516127',
		    body: request.body,
		    usersId: request.usersId,
		    messageId: request.messageId
  		})

		return data.save().then( (docs) => {
	    	return docs
	    })
  	}

  	destroy(id){
  		return Messages.delete({ _id: id })
					.then( (res) => {
						return res
	  				}).catch( (err) => {
						return err
					})
  	}
}

export default new MessagesModel()
