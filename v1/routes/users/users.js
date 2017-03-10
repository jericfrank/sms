import { Router } from 'express'
import lodash from 'lodash'

import Tokens from '../../models/tokens'
import Users from '../../models/users'
import Validator from '../../utils/validations/users'

const router = Router()


/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

router.get('/', (req , res) => {

	Users.get().then( (docs) => {
			res.status(200).send(docs)
		}).catch( (err) => {
			res.status(400).send(err);
		})
})

router.post('/', (req , res) => {
	const { errors , isValid } = Validator(req.body)

	if ( !isValid ) {
		res.status(400).send( errors )
	} else {

		Users.getByField({ email: req.body.email }).then((ifexists) => {
	    	if ( !lodash.isEmpty( ifexists ) ) {
	    		res.status(500).send({ email: ['Email already exists!'] })
	    	} else {

	    		Users.create( req.body ).then( (docs) => {

	    				Tokens.generate( docs._doc ) // generate token or key when successfully save

						res.status(200).send(docs)
					}).catch( (err) => {
						res.status(400).send(err)
					})

	    	}
		}).catch( (err) => {
			res.status(400).send(err)
		})

	}
})

router.put('/:id', (req , res) => {
	res.status(200).send('put full update')
})

router.patch('/:id', (req , res) => {
	res.status(200).send('patch partial update')
})

router.delete('/:id', (req , res) => {
	Users.destroy( req.params.id ).then( (docs) => {
		res.status(200).send(docs)
	}).catch( (err) => {
		res.status(400).send(err)
	})
})

export default router
