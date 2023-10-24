const Admin = require('../models/adminmodel');

const path = require('path');

const fs = require('fs');

const nodemailer = require("nodemailer");

module.exports.checklogin = async(req,res)=>{
    req.flash("success" , "Login successfully");
    return res.redirect('/admin/deshbord');
}

module.exports.profile = async(req,res)=>{
    
    return res.render("profile");
}

module.exports.homepage = async (req, res) => {
  
    return res.render("deshbord");
};

module.exports.add_admin = async(req,res)=>{
    return res.render("add_admin");
};

module.exports.view_admin = async(req ,res)=>{
    let adminData = await Admin.find({});
    if(adminData){
        return res.render("view_admin",{
            adminData : adminData,
        });
    }
    else{
        console.log("Record not found");
        return res.redirec('/admin/add_admin');
    }
};

module.exports.insertdata = async(req,res)=>{
    var name = req.body.fname+" "+req.body.lname;
    req.body.name = name;
   
    var img = '';
    if(req.file){
        img = Admin.avatarpath+"/"+req.file.filename;
    }
    req.body.admin_image = img;

    let data = await Admin.create(req.body);
    if(data){
        console.log("record inserted");
    }
    else{
        console.log("Something wrong");
    }
    req.flash("success" , "successfully Data inserted");
    return res.redirect('/admin/view_admin');
}


module.exports.deleteAdminRecord = async (req,res) =>{
    // console.log(req.params.id)
    let oldData = await Admin.findById(req.params.id);
    if(oldData){
        var imgPath = path.join(__dirname,"..",oldData.admin_image);
        if(imgPath){
            await fs.unlinkSync(imgPath);
        }
        let removeData = await Admin.findByIdAndDelete(oldData.id);
        if(removeData){
            console.log("file and record deleted successfully!!");
        }
        else{
            console.log("record not delete");
        }
    }
    else{
        console.log("Record not found");
    }
    req.flash("success" , "Record Delete successfully")
    return res.redirect('/admin/view_admin');
}

module.exports.UpdateAdminRecord = async(req,res)=>{
    console.log(req.params.id);
    let adminData = await Admin.findById(req.params.id);
    return res.render('update_admin',{
        adminData : adminData
    });
}

module.exports.EditRecord = async(req,res)=>{
    console.log(req.body);
    var EditId = req.body.EditId;
    let existOld = await Admin.findById(req.body.EditId);
    if(existOld){
        if(req.file){
            var imgpath = path.join(__dirname,'..',existOld.admin_image);
            console.log(imgpath);
            try{
                await fs.unlinkSync(imgpath);
            }
            catch(err){
                console.log(err);
            }
            var newImgPath = Admin.avatarpath+'/'+req.file.filename;
            req.body.admin_image = newImgPath;

        }
        else{
            let oldImg = existOld.admin_image;
            req.body.admin_image = oldImg;
        }
        req.body.name = req.body.fname+" "+req.body.lname;
        delete(req.body.EditId);
        delete(req.body.fname);
        delete(req.body.lname);
        delete(req.body.submit);
        console.log(req.body);
        let updateRecord = await Admin.findByIdAndUpdate(EditId,req.body);
        req.flash("success" , "your data is Updated")
        return res.redirect("/admin/deshbord");
        if(updateRecord){
            console.log("Record updated successfully");
        }
        else{
            console.log("somthing wrong");
        }
    }
    else{
        console.log("Record not found for update");
    }
    return res.redirect("/admin/view_admin");
}

module.exports.changepassword = async(req,res)=>{
    
    return res.render("changepassword");
}

module.exports.Editpassword = async(req,res)=>{
    // console.log(req.user);
    if(req.user.password == req.body.cpass){
        if(req.body.cpass != req.body.npass){
            if(req.body.npass == req.body.copass){
                await Admin.findByIdAndUpdate(req.user.id , {password:req.body.npass});
                return res.redirect("/admin/logout");
            }
            else{
                console.log("New and confirm password not match!!");
            }
        }
        else{
            console.log("current and new password are same");
        }
    }
    else{
        console.log("current and database password not match");
    }
    return res.redirect("/admin")
}

module.exports.chekforgetpass = async(req,res)=>{
    // console.log(req.body);
    let adData = await Admin.findOne({email : req.body.email}).countDocuments();
    if(adData == 1){
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: "shreyanshbuha89@gmail.com",
              pass: "acnkbdwpdumxdrky",
            },
          });

          do{
            number = Math.floor(Math.random()*9999);
          }while(number < 1000)

          res.cookie('otp' , number);
          res.cookie('email' , req.body.email);

            // send mail with defined transport object
            const info = await transporter.sendMail({
              from: 'shreyanshbuha89@gmail.com', // sender address
              to: req.body.email , // list of receivers
              subject: " Forget Password", // Subject line
              text: "your otp is", // plain text body
              html: `your otp is : ${number}`, // html body
            });

        console.log("Email set successfully");
        return res.redirect("/admin/pageotp")
    }
    else{
        console.log("data not found");
    }
}

module.exports.verifyOtp = async(req,res)=>{
    console.log(req.cookies.otp);
    console.log(req.body.otp);
    if(req.cookies.otp == req.body.otp){
        return res.redirect("/admin/resetpassword")
    }
    else{
        console.log("OTP not match");
        return res.redirect("back");
    }
}

module.exports.verifyResetPassword = async(req,res) => {
    // console.log(req.body);
    let email = req.cookies.email;
    if(req.body.npass == req.body.cpass){
        let oldEmailData = await Admin.findOne({email:email});
        if(oldEmailData){
            await Admin.findByIdAndUpdate(oldEmailData.id , {password : req.body.npass});
            res.clearCookie('otp');
            res.clearCookie('email');
            return res.redirect("/admin");
        }
        else{
            console.log("Email not Found");
        }
    }
    else{
        console.log("New and Confirm password not match");
    }
}