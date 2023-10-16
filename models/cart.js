const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        //read from cart file
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            //Finding index of product with ID in cart products
            const existingProductIndex = cart.products.findIndex(
                prod => prod.id === id
            );
            //found specific product
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            //If found then increase quantity by 1 of specific product, copy cart product then repace specific product
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            //If product not found, creating product, add new product to cart products
            else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            //add product price to total price of cart
            cart.totalPrice = cart.totalPrice + +productPrice;
            //write new updated cart data to cart file
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }
    //deleting product with ID
    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            //find product in cart
            const product = updatedCart.products.find(prod => prod.id === id);
            if (!product) {
                return;
            }
            //If product found in cart, storing quantity of product
            const productQty = product.qty;
            //getting all product whose ID not match with required Product ID
            updatedCart.products = updatedCart.products.filter(
                prod => prod.id !== id
            );
            //updating total price of product in cart
            updatedCart.totalPrice =
                updatedCart.totalPrice - productPrice * productQty;
            //writing updated product data to cart
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    }
};