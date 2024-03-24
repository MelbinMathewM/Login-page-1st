const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
const session = require('express-session');
const nocache = require("nocache");
const {v4 : uuidv4} = require('uuid');

const router = require('./router.js');

const port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(nocache());

app.set('view engine','ejs');

//load public assets
app.use('/static',express.static(path.join(__dirname,'views/public')));
app.use('/assets',express.static(path.join(__dirname,'views/assets')));

app.use(session({
    secret : uuidv4(),
    resave :false,
    saveUninitialized : true
}));

app.use('/route',router);

//home route
app.get('/',(req,res) =>{
    if(req.session.user){
        res.render('dashboard',{user : req.session.user});
    }
    res.render('base',{title : "Login"});
})

app.listen(port,() => {
    console.log("listening to the server on http://localhost:3000")
});