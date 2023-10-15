//Importing file from models
const Product= require('../models/product');
const Cart=require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    });
  };
  
  exports.getProuduct = (req,res,next) => {
    //here productId is name used in route as variable
    const prodId = req.params.productId;
    console.log(prodId);
    Product.findById(prodId, product => {
      res.render('shop/product-detail',{product : product, pageTitle:product.title , path: '/products'} );
    });
  }
  
  exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    });
  };
  
  exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart'
    });
  };

  exports.postCart = (req,res,next) => {
    const proId = req.body.productId;
    Product.findById(proId , product => {
      Cart.addProduct(proId, product.price);
    });
    res.redirect('/cart');
  }
  
  exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders'
    });
  };
  
  exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
      path: '/checkout',
      pageTitle: 'Checkout'
    });
  };