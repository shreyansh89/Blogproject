const express = require("express");

const route = express.Router();

const admin = require("../models/adminmodel");

const passport = require("passport");

// console.log("admin connect");

const admincontroller = require("../controller/admincontroller");

route.get('/',(req,res)=>{
    // if(req.cookies.id != undefined){
    //     return res.redirect("/admin/dashboard");
    // }
    if(req.isAuthenticated()){
        return res.redirect("/admin/dashboard");
    }
    return res.render('admin_login');
});

route.get('/logout', async (req,res)=>{
    // res.clearCookie('id');
    req.session.destroy();
    return res.redirect('/admin/');
})

route.get('/profile' , passport.checkAuthentication ,  admincontroller.profile);

route.post('/checklogin', passport.authenticate('local',{failureRedirect : "/admin/"}), admincontroller.checklogin);

route.get("/deshbord",passport.checkAuthentication, admincontroller.homepage);

route.get("/add_admin", passport.checkAuthentication,admincontroller.add_admin);

route.get("/view_admin",passport.checkAuthentication, admincontroller.view_admin);

route.post("/insertdata",admin.uplodeadavatar, admincontroller.insertdata);

route.get("/deleteAdminRecord/:id", passport.checkAuthentication,admincontroller.deleteAdminRecord);

route.get("/UpdateAdminRecord/:id" ,passport.checkAuthentication, admincontroller.UpdateAdminRecord);

route.post("/EditRecord" ,passport.checkAuthentication, admin.uplodeadavatar , admincontroller.EditRecord);

route.get("/changepassword" , passport.checkAuthentication, admincontroller.changepassword );

route.post("/Editpassword" , passport.checkAuthentication, admincontroller.Editpassword);


route.use("/slider"  , passport.checkAuthentication , require("./slider"));

route.use("/offer"  , passport.checkAuthentication  , require("./offer"));

route.use("/photo" , passport.checkAuthentication , require("./photo"));

route.use("/post" , passport.checkAuthentication , require("./post"));

route.use("/other" , passport.checkAuthentication, require("./other"));

route.use("/category" , passport.checkAuthentication , require("./category"));

route.use("/subcategory" , passport.checkAuthentication , require("./subcatagory"));

route.use("/contect" , passport.checkAuthentication , require("./contect"));

route.get("/forgetpassword" , async(req,res)=>{
    return res.render("forgetpass");
});

route.post("/chekforgetpass" , admincontroller.chekforgetpass);

route.get("/pageotp" , async(req,res) => {
    return res.render("pageotp");
})

route.post("/verifyOtp" , admincontroller.verifyOtp);

route.get("/resetpassword" , async(req,res)=>{
    return res.render("resetpassword");
});

route.post("/verifyResetPassword" , admincontroller.verifyResetPassword);


module.exports = route;