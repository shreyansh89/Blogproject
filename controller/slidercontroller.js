const slidermodel = require("../models/slidermodel");

const path = require("path");

const fs = require("fs");

module.exports.add_slider = async(req,res)=>{
    return res.render("add_slider");
}

module.exports.insertslider = async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
    var img = '';
    if(req.file){
        img =  await slidermodel.avatarpath+"/"+req.file.filename;
    }
    req.body.slider_image = img;
    req.body.isactive = true;
    await slidermodel.create(req.body);
    req.flash("success" , "Your Data is Inserted")
    return res.redirect('/admin/slider/view_slider');
}

module.exports.view_slider = async(req,res)=>{
    var search = '';
    if(req.query.search){
        search = req.query.search
    }

    let page = 0;
    if(req.query.page){
        page = req.query.page
    }
    limit = 2;  

    let sliderData = await slidermodel.find({
        $or : [
            {title : {$regex : ".*" + search + ".*" , $options : "i"}}
        ]
        
    })
    .skip(page*limit)
    .limit(2);


    let countslider = await slidermodel.find({
        $or : [
            {title : {$regex : ".*" + search + ".*" , $options : "i"}}
        ]
        
    })
    .countDocuments();

    let setpage = Math.ceil(countslider/limit);

    return res.render("view_slider" , {
        sliderData : sliderData,
        totalpage : setpage,
        search : search,
        currentpage : page
    });
}

module.exports.activedata = async(req,res)=>{
    let updatedata = await slidermodel.findByIdAndUpdate(req.params.id,{isactive:false});
    return res.redirect("back");
}

module.exports.deactive = async(req,res)=>{
    let updatedata = await slidermodel.findByIdAndUpdate(req.params.id,{isactive:true})
    return res.redirect("back");
}

module.exports.deleteRecord = async(req,res)=>{
    let oldData = await slidermodel.findById(req.params.id);
    if(oldData){
        var imgPath = path.join(__dirname,"..",oldData.slider_image);
        if(imgPath){
            await fs.unlinkSync(imgPath);
        }
        let removeData = await slidermodel.findByIdAndDelete(oldData.id);
        if(removeData){
            console.log("data deleted");
        }
        else{
            console.log("data not delete");
        }
    } 
    else{
        console.log("data not found");
    }
    req.flash("success" , "Record Delete successfully")
    return res.redirect("back");
}

module.exports.UpdateRecord = async(req,res)=>{
    let sliderData = await slidermodel.findById(req.params.id);
    return res.render("update_slider" , {
        sliderData : sliderData
    })
}

module.exports.EditRecord = async(req,res)=>{
    var EditId = req.body.EditId;
    let existOld = await slidermodel.findById(req.body.EditId);
    if(existOld){
        if(req.file){
            var imgpath = path.join(__dirname,'..',existOld.slider_image);
            console.log(imgpath);
            try{
                await fs.unlinkSync(imgpath);
            }
            catch(err){
                console.log(err);
            }
            var newImgPath = slidermodel.avatarpath+'/'+req.file.filename;
            req.body.slider_image = newImgPath;
        }
        else{
            let oldImg = existOld.slider_image;
            req.body.slider_image = oldImg;
        }
        delete(req.body.EditId);
        console.log(req.body);
        let updateRecord = await slidermodel.findByIdAndUpdate(EditId,req.body);
        req.flash("success" , "your data is Updated");
        return res.redirect("/admin/slider/view_slider");
    }
    else{
        console.log("Record not found for update");
    }
    return res.redirect("back");
}

module.exports.multisliderdelete = async(req,res)=>{
    await slidermodel.deleteMany({'_id':{'$in':req.body.delAll}});
    return res.redirect("back");
}