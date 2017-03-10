import { Router } from 'express'
import lodash from 'lodash'
import requireDir from 'require-dir'

import methodMiddleware from './utils/middlewares/methods'

const router = Router()

const routes = requireDir('./routes',{ recurse: true })

lodash.forEach( routes , (dir , key) => {
	lodash.forEach( dir , (subDir) => {
		router.use( `/${key}` , methodMiddleware, subDir.default)
	})
})

export default router
