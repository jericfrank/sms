import { Router } from 'express'
import lodash from 'lodash'
import cuid from 'cuid'

import Engine from '../../../server/engine'
import Messages from '../../models/messages'
import Validator from '../../utils/validations/messages'
import config from '../../../config/development'

const router = Router()

router.get('/', (req,res) => {
	Messages.get().then( (docs) => {
		res.status(200).send(docs)
	}).catch( (err) => {
		res.status(400).send(err)
	})
})

router.get('/:id', (req,res) => {
	Messages.getByField({ messageId: req.params.id }).then((docs) => {
    	res.status(200).send(docs)
	}).catch( (err) => {
		res.status(400).send(err)
	})
})

router.post('/', (req, res) => {
	const { errors , isValid } = Validator(req.body)

	if ( !isValid ) {
		res.status(400).send( errors )
	} else {

		const message = {
			messageId: cuid(),
			status: 'processing',
			recipients: req.body.recipients,
			body: req.body.body
		}

		res.status(200).send( message )

		lodash.forEach( req.body.recipients , (value , key) => {
			const data = {
				to: value,
				body: message.body,
				messageId: message.messageId
			}

			Engine.sms.messages.create({
		        to: data.to,
		        from: config.twilio.number,
		        body: data.body
		    }).then( () => {
			    Messages.create( data ).then((docs) => {
			    	console.log('success! ', docs)
					// res.status(200).send(docs)
				}).catch( (err) => {
					console.log( err )
					// res.status(400).send(err)
				})
		    }).catch( (err) => {
		    	console.log( err )
				// res.status(400).send(err)
			})
		})

	}
})

router.delete('/:id', (req, res) => {
	Messages.destroy( req.params.id ).then( (docs) => {
		res.status(200).send(docs)
	}).catch( (err) => {
		res.status(400).send(err)
	})
})

export default router
