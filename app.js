const express=require('express');
const app=express();

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));


app.get('/add-product' , (req,res,next) => {
    res.send('<form action="/product" method="post">Name:<input type="text" name="title"><br>Size:<input type="number" name="size"><button type="submit">SEND DATA</button></form>');
});

app.post('/product' , (req,res,next) => {
    console.log(req.body);
    res.redirect('/');
})

app.use('/',(req,res,next)=> {
    res.send('<h1>Hello from express!</h1>');
});

app.listen(3000);