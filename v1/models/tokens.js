import jwt from 'jsonwebtoken'

import config from '../../config/development'
import Users from '../../schema/Users'
import Model from './model'

class TokensModel extends Model {

	constructor() {
		super()
	}

   	generate(request) {
  		const token = jwt.sign({
  			_id: request._id,
  			name: request.name,
  			email: request.email,
  			admin: request.admin
  		}, config.secret )

  		Users.findOne( request._id ,  (err, doc) => {
		  	doc.key = token
			doc.save()
		})

		return token
  	}
}

export default new TokensModel()
