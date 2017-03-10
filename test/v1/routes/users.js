import http from 'http'
import assert from 'assert'

import config from '../../../config/development'
import '../../../server/index'

describe('Users routes', () => {

  	it('should reponse to /v1/users', done => {
  		http.get(`${config.server}/api/v1/users`, res => {
    		assert.equal(200, res.statusCode)
    		done()
  		})
	})

})
