const sequelize = require('../util/database');

const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getProuduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId);
  Product.findByPk(prodId)
    .then((product) => {
      res.render('shop/product-detail', { product: product, pageTitle: product.title, path: '/products' });
    })
    .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cart => {
      return cart.getProducts()
    })
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })

};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchcart;
  let newQuantity = 1;
  //getting cart from user
  req.user.getCart()
    .then(cart => {
      //storing cart so that we can use this cart later
      fetchcart = cart;
      //returning product from cart having Product ID as prodId
      return cart.getProducts({ where: { id: prodId } })
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      //If product found in cart
      if (product) {
        let oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        //If product is found in cart, then this product returned here which will hold new quantity
        return product;
      }
      //if product is not found in cart, then we returning product from product table finding specific product by id
      return Product.findByPk(prodId)
    })
    .then(product => {
      //adding product to cart and passing quantity of product using 2nd argument
      return fetchcart.addProduct(product, { through: { quantity: newQuantity } });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err))

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

exports.postDeleteCart = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } })
    })
    .then(products => {
      return products[0].cartItem.destroy();
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
}