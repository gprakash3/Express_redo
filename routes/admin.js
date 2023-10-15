const express=require('express');
const router= express.Router();

const adminController = require('../controller/admin');

router.get('/add-product' , adminController.getAddProduct);
router.post('/product' , adminController.postAddProduct);
router.get('/',adminController.getViewProduct);
router.get('/products',adminController.getViewProduct);

module.exports = router;