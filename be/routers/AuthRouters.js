const express=require('express')
const {AuthControllers}=require('../controllers')
const {auth}=require('../helper/auth')
const router=express.Router()

router.post('/register',AuthControllers.register)
router.get('/verified',auth,AuthControllers.verifieduser)
router.post('/sendemailverified',AuthControllers.sendemailverified)
router.get('/login',AuthControllers.login)
router.get('/keeplogin',auth,AuthControllers.keeplogin)
router.post('/forgotpassword',AuthControllers.forgotpassword)
router.get('/forgotpasswordverified',auth,AuthControllers.forgotpasswordverified)
router.post('/resetpassword',AuthControllers.resetpassword)

module.exports=router