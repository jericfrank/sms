import validate from 'validate.js'
import lodash from 'lodash'

export default (request) => {
	let errors = {}

	errors.name = validate.single( request.name , {
		presence: true,
	    length: {
	    	minimum: 3,
	    	message: "must be at least 3 characters"
	    }
	}, { fullMessages: false })

	errors.email = validate.single( request.email , {
		presence: true,
	}, { fullMessages: false })

	errors.password = validate.single( request.password , {
		presence: true,
	}, { fullMessages: false })

	return {
		errors,
		isValid: !lodash.values(errors).some(x => x !== undefined)// check sproperty of object if empty
	}
}
