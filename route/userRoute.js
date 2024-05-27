import express from 'express'
import { SignIn, addCategory, addSubCategory, showCategories, showSubCategories, signUp } from '../controller/userController.js'
const router = express.Router()


router.post('/register',signUp)
router.post('/login',SignIn)
router.post('/addCategory',addCategory)
router.get('/showCategories',showCategories)
router.post('/addSubCategory',addSubCategory)
router.get('/showSubCategories',showSubCategories)

export default router
