import http from 'http'
import assert from 'assert'
import config from '../config/development'

import '../server/index'

describe('Server', () => {
	it('should reponse to server', done => {
    	http.get(`${config.server}`, res => {
      		assert.equal(200, res.statusCode)
      		done()
    	})
  	})
})

import './v1/routes/users'
