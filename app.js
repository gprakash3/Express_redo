const path=require('path');

const express=require('express');
const app=express();

const sequelize=require('./util/database');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
// const rootDir=require('./util/path');
// app.use(express.static(path.join(rootDir, 'public')));

const errorController= require('./controller/error');

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactRoutes= require('./routes/contactus');



app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(contactRoutes);

app.use('/' ,errorController.errorPage);

sequelize.sync()
.then(result => {
    console.log('app started');
    app.listen(3000);
})
.catch(err=>console.log(err));