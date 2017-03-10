import validate from 'validate.js'
import lodash from 'lodash'

export default (request) => {
	let errors = {}

	errors.body = validate.single( request.body , {
		presence: true,
	    length: {
	    	minimum: 15,
	    	message: "must be at least 15 characters"
	    }
	}, { fullMessages: false })

	errors.key = validate.single( request.key , {
		presence: true
	}, { fullMessages: false })

	errors.mode = validate.single( request.mode , {
		presence: true,
		inclusion: {
      		within: [
      			"ajax",
      			"socket"
      		],
    		message: '"%{value}" is not allowed'
    	}
	}, { fullMessages: false })

	const array = validate.isArray( request.recipients )

	if( !array ) {

		errors.recipients = 'must be an array'

	} else {
		let error = {}

		lodash.forEach( request.recipients , (value , key) => {
			error[ key ] = validate.single( value , {
				presence: true,
				format: {
					pattern: /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/,
					message: "must be valid phone/mobile number"
				}
			})
		})

		if ( lodash.values(error).some(x => x !== undefined) ) {// check sproperty of object if empty
			errors.recipients = error
		}
	}

	return {
		errors,
		isValid: !lodash.values(errors).some(x => x !== undefined)// check sproperty of object if empty
	}
}
