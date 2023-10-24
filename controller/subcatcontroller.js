const catagory = require("../models/categorymodel");
const subcatagory = require("../models/subcatmodel");

module.exports.add_subcategory = async(req,res)=>{
    let CatData = await catagory.find({});
    return res.render("add_subcategory" , {
        CatData : CatData
    });
}

module.exports.insertSubcategory = async(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    let img = "";
    if(req.file){
        img = await subcatagory.avatarpath+"/"+req.file.filename;
    }
    req.body.subcat_image = img;
    req.body.isactive = true;
    await subcatagory.create(req.body);
    req.flash("success" , "Your Data is Inserted")
    return res.redirect("back");
}

module.exports.view_subcategory = async(req,res) =>{
    var search = '';
    if(req.query.search){
        search = req.query.search
    }

    let subcategoryData = await subcatagory.find({
        $or : [
                { title : {$regex : ".*" + search + ".*" , $options : "i"}},
                { name : {$regex : ".*" + search + ".*" , $options : "i"}}
              ]
    })
    .populate('cstegoryId')
    // console.log(subcategoryData);

    return res.render("view_subcategory" , {
        subdata : subcategoryData,
        search : search,
    })
}

module.exports.deleterecord = async(req,res)=>{
    let oldData = await subcatagory.findById(req.params.id);
    if(oldData){
        var imgPath = path.join(__dirname,"..",oldData.subcat_image);
        if(imgPath){
            await fs.unlinkSync(imgPath);
        }
        let removeData = await subcatagory.findByIdAndDelete(oldData.id);
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

module.exports.activedata = async(req,res)=>{
    let updatedata = await subcatagory.findByIdAndUpdate(req.params.id,{isactive : false});
    return res.redirect("back")
}

module.exports.deactivedata = async(req,res)=>{
    let updatedata = await subcatagory.findByIdAndUpdate(req.params.id,{isactive : true});
    return res.redirect("back")
}

module.exports.multiRecorddelete = async(req,res)=>{
    // console.log(req.body.delAll);
    await subcatagory.deleteMany({'_id':{'$in':req.body.delAll}});
    return res.redirect("back");
}