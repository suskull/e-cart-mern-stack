import express from 'express'
const router = express.Router()

import {addOrderItems} from '../../controllers/orderControllers.js'
import auth from '../../middleware/auth.js'

router.route('/').post(auth,addOrderItems)


export default router