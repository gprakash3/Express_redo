const express=require('express');
const router= express.Router();

router.get('/add-product' , (req,res,next) => {
    res.send('<form action="/admin/product" method="post">Name:<input type="text" name="title"><br>Size:<input type="number" name="size"><button type="submit">SEND DATA</button></form>');
});

router.post('/product' , (req,res,next) => {
    console.log(req.body);
    res.redirect('/shop');
})

module.exports = router;