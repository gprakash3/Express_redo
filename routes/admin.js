const express=require('express');
const router= express.Router();

const adminController = require('../controller/admin');

router.get('/add-product' , adminController.getAddProduct);
router.post('/product' , adminController.postAddProduct);
router.get('/',adminController.getViewProduct);
router.get('/products',adminController.getViewProduct);
router.get('/edit-product/:productId' ,adminController.getEditProduct);
router.post('/edit-product' ,adminController.postEditProduct);
router.post('/delete/:productId' ,adminController.postDeleteProduct);

module.exports = router;