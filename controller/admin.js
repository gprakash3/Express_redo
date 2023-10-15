const path=require('path');
const rootDir = require('../util/path');

const Product= require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
}

exports.postAddProduct = (req,res,next) => {
    //making Product object
    const product = new Product(req.body);
    //calling save method
    product.save();  

    res.redirect('/');
}
