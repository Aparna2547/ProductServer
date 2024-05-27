import express from 'express'
import { SignIn, signUp } from '../controller/userController.js'
const router = express.Router()


router.post('/register',signUp)
router.post('/login',SignIn)
export default router
