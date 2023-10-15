const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

//path to product file(in JSON formate) in data folder
const p = path.join(rootDir, 'data', 'products.json');


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
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
      }

    //save data to file
    save() {
        this.id=Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
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
};