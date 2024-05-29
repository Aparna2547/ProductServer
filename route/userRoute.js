import express from 'express'
import { SignIn, addCategory, addProduct, addSubCategory, addToWishlist, categoriesToFilter, displayProduct, logout, removeFromWishlist, showCategories, showSubCategories, showWishlist, signUp, singleProduct, uploadImage } from '../controller/userController.js'
import { multerMid } from '../middleware/multer.js'
const router = express.Router()


router.post('/signup',signUp)
router.post('/login',SignIn)
router.post('/addCategory',addCategory)
router.get('/showCategories',showCategories)
router.post('/addSubCategory',addSubCategory)
router.get('/showSubCategories',showSubCategories)
router.post('/addProduct',addProduct)
router.get('/allProduct',displayProduct)
router.get('/singleProductView',singleProduct)
router.get('/homeCategories',categoriesToFilter)
router.post('/addToWishlist',addToWishlist)
router.get('/displayWishlist',showWishlist)
router.delete('/removefromwishlist',removeFromWishlist)
router.get('/logout',logout  )

router.post('/upload',multerMid.single('image'),uploadImage)

export default router
