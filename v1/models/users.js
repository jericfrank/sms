import bcrypt from 'bcryptjs'

import Users from '../../schema/Users'
import Model from './model'

class UsersModel extends Model {

	constructor() {
		super()
	}

  	get() {
	  	return Users.find()
				.then( (res) => {
					return res
				})
				.catch( (err) => {
					return err
				})
  	}

  	getByField(obj){
		return Users.find(obj).then( (docs) => {
			return docs
	  	})
	}

   	create(request) {

  		const data = new Users({
			name: request.name,
			email: request.email,
			password: bcrypt.hashSync(request.password),
			admin: false
		})

		return data.save().then( (docs) => {
	    	return docs
	    })
  	}

  	destroy(id){
  		return Users.delete({ _id: id })
					.then( (res) => {
						return res
	  				}).catch( (err) => {
						return err
					})
  	}
}

export default new UsersModel()
