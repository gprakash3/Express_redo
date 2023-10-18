const express=require('express');
const router=express.Router();

const shopController = require('../controller/shop');

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);

router.get('/products/:productId',shopController.getProuduct);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.get('/orders', shopController.getOrders);
router.get('/checkout', shopController.getCheckout);
router.post('/cart-delete-item', shopController.postDeleteCart);

module.exports = router;