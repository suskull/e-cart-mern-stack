import express from 'express'
import { userLogin, getUserProfile, userRegister, updateUserProfile } from '../../controllers/userControllers.js'
import auth from '../../middleware/auth.js'
const router = express.Router()


router.route('/login').post(userLogin)
router.route('/register').post(userRegister)
router.route('/profile').get(auth, getUserProfile).put(auth, updateUserProfile)

export default router