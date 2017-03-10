import jwt from 'jsonwebtoken'

import config from '../config/development'

export default (req, res, next) => {

	// middleware conditions
	const headers = req.headers['authorization']

	if ( headers ) {
		const token = headers.split(' ')[1]

		jwt.verify(token, config.secret, (err, decoded) => {
			if (err) {
				res.status(401).send('Unauthorized')
			} else {

				req.user = decoded
				next()
			}
		})

	} else {
		res.status(404).send('Not Found')
	}
}
