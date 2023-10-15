const path=require('path');
const rootDir = require('../util/path');

exports.getViewProduct = (req,res,next) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
}