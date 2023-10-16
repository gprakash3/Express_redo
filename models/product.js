const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const p = path.join(rootDir, 'data', 'products.json');

const Cart = require('./cart');

const getProductsFromFile = cb => {
    //read file
    fs.readFile(p, (err, fileContent) => {
        if (err) {
          return cb([]);
        } else {
           return cb(JSON.parse(fileContent));
        }
      });
};

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
      }
    
      save() {
        getProductsFromFile(products => {
          //if In editing mode, then replace product at index with updated product
          if (this.id) {
            const existingProductIndex = products.findIndex(prod => prod.id === this.id);
            const updatedProduct = [...products];
            updatedProduct[existingProductIndex] = this;
            fs.writeFile(p, JSON.stringify(updatedProduct), err => {
              console.log(err);
            });
          }
          //if creating new product, add product to product file
          else {
            this.id = Math.random().toString();
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
              console.log(err);
            });
          }
        });
      }
    //get data from file
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb){
        getProductsFromFile(products =>  {
          const product = products.find(p => p.id===id);
          cb(product);
        })
      }

      static deleteProductById(id) {
        getProductsFromFile(products => {
          const product = products.find(prod => prod.id === id);
          const updatedProduct = products.filter(prod => prod.id !== id);
          fs.writeFile(p, JSON.stringify(updatedProduct), err => {
            if (!err) {
              console.log('product deleted from cart, called from product.js');
              Cart.deleteProduct(id, product.price);
            }
          });
        });
      }
};