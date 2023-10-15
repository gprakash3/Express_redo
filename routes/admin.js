const express=require('express');
const router= express.Router();

const adminController = require('../controller/admin');

router.get('/add-product' , adminController.getAddProduct);
router.post('/product' , adminController.postAddProduct);

module.exports = router;