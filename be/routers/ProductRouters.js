const express=require('express')
const {ProductControllers}=require('../controllers')
const {auth}=require('../helper/auth')

const router=express.Router()

//================ ADMIN ROUTER ================//

router.get('/getprod',ProductControllers.getProduct)
router.post('/addprod',auth,ProductControllers.addProduct)
router.get('/category',ProductControllers.getcategory)
router.delete('/deleteprod/:id',ProductControllers.deleteProduct)
router.put('/editprod/:id',auth,ProductControllers.editProduct)

//================ USER ROUTER ================//

router.get('/getproductuser',ProductControllers.getProductUser)
router.get('/totalproduct',ProductControllers.getTotalProduct)
router.get('/productdetail/:id',ProductControllers.selectproduct)


module.exports=router 