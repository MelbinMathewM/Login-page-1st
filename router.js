var express = require('express');
var router = express.Router();

const credentials = {
    email : 'melbin@gmail.com',
    password : 'm123'
}

//login router
router.post('/login',(req,res) =>{
    if(req.body.email == credentials.email && req.body.password == credentials.password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
    }else{
        res.render('base',{ msg : 'Invalid entry...'})
    }
});
//route for dashboard
router.get('/dashboard',(req,res) =>{
    if(req.session.user){
        res.render("dashboard",{user : req.session.user})
    }else{
        res.redirect("/")
    }
})

//route for logout
router.get('/logout',(req,res) =>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("error");
        }else{
            res.render('base',{title: "Express",logout :"Logout Successfull..."})
        }
    })
})

module.exports = router;