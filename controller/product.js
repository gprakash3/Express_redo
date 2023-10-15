const path=require('path');
const rootDir = require('../util/path');

//Importing file from models
const Product= require('../models/product');

exports.getViewProduct = (req,res,next) => {
    //passing function on fetchAll
    Product.fetchAll((products) => {
        console.log(products);
        res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    });  
}