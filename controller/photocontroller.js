const photo = require("../models/photomodel");

const path = require("path");

const fs = require("fs");


module.exports.add_photo = async(req,res)=>{
    return res.render("add_photo");
}

module.exports.insertphoto = async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
    let img = "";
    if(req.file){
        img = await photo.avatarpath+"/"+req.file.filename;
    }
    req.body.p_image = img;
    req.body.isactive = true;
    await photo.create(req.body);
    req.flash("success" , "Your Data is Inserted")
    return res.redirect("/");
}

module.exports.view_photo = async(req,res)=>{
    var search = '';
    if(req.query.search){
        search = req.query.search
    }

    let page = 0;
    if(req.query.page){
        page = req.query.page
    }
    limit = 2;

    let photoData = await photo.find({
        $or : [
            {title : {$regex : ".*" + search + ".*" , $options : "i"}}
        ]
    })
    .skip(page*limit)
    .limit(2);


    let countphotos = await photo.find({
        $or : [
            {title : {$regex : ".*" + search + ".*" , $options : "i"}}
        ]
    })
    .countDocuments();

    let setpage = Math.ceil(countphotos/limit);
    

    return res.render("view_photo" , {
        photoData : photoData,
        totalpage : setpage,
        search : search,
        currentpage : page
    })
}

module.exports.activedata = async(req,res)=>{
    let updatedata = await photo.findByIdAndUpdate(req.params.id,{isactive : false});
    return res.redirect("back");
}

module.exports.deactivedata = async(req,res)=>{
    let updatedata = await photo.findByIdAndUpdate(req.params.id,{isactive : true});
    return res.redirect("back");
}

module.exports.deleteRecord = async(req,res)=>{
    let oldData = await photo.findById(req.params.id);
    if(oldData){
        var imgPath = path.join(__dirname,"..",oldData.p_image);
        if(imgPath){
            await fs.unlinkSync(imgPath);
        }
        let removeData = await photo.findByIdAndDelete(oldData.id);
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
    return res.redirect('back');
}

module.exports.UpdateRecord = async(req,res)=>{
    let photoData = await photo.findById(req.params.id);
    return res.render("update_photo" , {
        photoData : photoData
    });
}

module.exports.EditRecord = async(req,res)=>{
    var EditId = req.body.EditId;
    let existOld = await photo.findById(req.body.EditId);
    if(existOld){
        if(req.file){
            var imgpath = path.join(__dirname,'..',existOld.p_image);
            console.log(imgpath);
            try{
                await fs.unlinkSync(imgpath);
            }
            catch(err){
                console.log(err);
            }
            var newImgPath = photo.avatarpath+'/'+req.file.filename;
            req.body.p_image = newImgPath;
        }
        else{
            let oldImg = existOld.p_image;
            req.body.p_image = oldImg;
        }
        delete(req.body.EditId);
        console.log(req.body);
        let updateRecord = await photo.findByIdAndUpdate(EditId,req.body);
        req.flash("success" , "your data is Updated");
        return res.redirect("/admin/photo/view_photo");
    }
    else{
        console.log("Record not found for update");
    }
    return res.redirect("back");
}

module.exports.multiphotodelete = async(req,res)=>{
    // console.log(req.body.delAll);
    await photo.deleteMany({'_id':{'$in':req.body.delAll}});
    return res.redirect("back");
}