const path=require('path');
const rootDir = require('../util/path');

const express=require('express');
const router= express.Router();

router.get('/add-product' , (req,res,next) => {
    res.sendFile(path.join(rootDir, 'views' , 'add-product.html'));
});

router.post('/product' , (req,res,next) => {
    console.log(req.body);
    res.redirect('/shop');
})

module.exports = router;