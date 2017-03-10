export default (req, res, next) => {

	const { _id , name , email , admin } = req.user

	if ( admin ) {
		// if admin
	} else {

		// if ( req.method == 'GET' ) {
		// 	next()
		// } else if ( req.method == 'POST' ) {
		// 	res.status(401).send('Unauthorized')
		// }

	}

	next()
}
