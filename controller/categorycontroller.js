const Category = require("../models/categorymodel");

module.exports.add_category = async(req,res)=>{
    return res.render("add_category");
}

module.exports.insertCategory = async(req,res)=>{
    // console.log(req.body);
    req.body.isactive = true;
    await Category.create(req.body);
    return res.redirect("back");
}

module.exports.view_category = async(req,res)=>{
    var search = '';
    if(req.query.search){
        search = req.query.search
    }

    let CategoryData = await Category.find({
        $or : [
                { title : {$regex : ".*" + search + ".*" , $options : "i"}},
              ]
    })
    // console.log(CategoryData);

    return res.render("view_category" , {
        category : CategoryData,
        search : search,
    })
}

module.exports.deleteRecord = async(req,res)=>{
    let oldData = await Category.findById(req.params.id);
    if(oldData){
        let removeData = await Category.findByIdAndDelete(oldData.id);
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

module.exports.deleteMultiRecord = async(req,res)=>{
    // console.log(req.body.delAll);
    await Category.deleteMany({'_id':{'$in':req.body.delAll}});
    return res.redirect("back");
}

module.exports.activeCategory = async(req,res) =>{3
    let updateComment = await Category.findByIdAndUpdate(req.params.id,{isactive:false});
    return res.redirect("back");
}

module.exports.deactiveCategory = async(req,res) =>{
    let updateComment = await Category.findByIdAndUpdate(req.params.id,{isactive:true});
    return res.redirect("back");
}