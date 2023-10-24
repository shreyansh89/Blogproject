const othermodel = require("../models/othermodel");

module.exports.add_other = async(req,res)=>{
    return res.render("add_other");
}

module.exports.insertother = async(req,res)=>{
    // console.log(req.body);
    req.body.isactive = true;
    await othermodel.create(req.body);
    req.flash("success" , "Your Data is Inserted")
    return res.redirect('/');
}

module.exports.view_other = async(req,res) =>{
    var search = '';
    if(req.query.search){
        search = req.query.search
    }

    let page = 0;
    if(req.query.page){
        page = req.query.page
    }
    limit = 2
    
    let otherData = await othermodel.find({
        $or : [
            { name : {$regex : ".*" + search + ".*" , $options : "i"}}
        ]
    })
    .skip(page*limit)
    .limit(2)
    // console.log(otherData);

    let countpost = await othermodel.find({
        $or : [
            { name : {$regex : ".*" + search + ".*" , $options : "i"}}
        ]
    })
    .countDocuments();
    // console.log(countpost);

    let setpage = Math.ceil(countpost/limit);
    // console.log(setpage);



    return res.render("view_other" , {
        otherData : otherData,
        totalpage : setpage,
        search : search,
        currentpage : page
    })
}

module.exports.activedata = async(req,res)=>{
    let updatedata = await othermodel.findByIdAndUpdate(req.params.id,{isactive : false});
    return res.redirect("back")
}

module.exports.deactivedata = async(req,res)=>{
    let updatedata = await othermodel.findByIdAndUpdate(req.params.id,{isactive : true});
    return res.redirect("back")
}

module.exports.deleterecord = async(req,res)=>{
    let oldData = await othermodel.findById(req.params.id);
    if(oldData){
        let removeData = await othermodel.findByIdAndDelete(oldData.id);
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
    // console.log(req.params.id);
    let otherData = await othermodel.findById(req.params.id);
    return res.render("update_other" , {
        otherData : otherData
    });
}

module.exports.EditRecord = async(req,res)=>{
    var EditId = req.body.EditId;
    let existOld = await othermodel.findById(req.body.EditId);
    if(existOld){
        delete(req.body.EditId);
        console.log(req.body);
        let updateRecord = await othermodel.findByIdAndUpdate(EditId,req.body);
        return res.redirect("/admin/other/view_other");
    }
    else{
        console.log("Record not found for update");
    }
    req.flash("success" , "your data is Updated");
    return res.redirect("back");
}

module.exports.deleteMultiRecord = async(req,res)=>{
    // console.log(req.body.delAll);
    await othermodel.deleteMany({'_id':{'$in':req.body.delAll}});
    return res.redirect("back");
}