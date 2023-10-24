const offer = require("../models/offermodel");
const offermodel = require("../models/offermodel");

module.exports.add_offer = async(req,res)=>{
    return res.render("add_offer")
}

module.exports.insertoffer = async(req,res)=>{
    // console.log(req.body);
    req.body.isactive = true;
    await offermodel.create(req.body);
    req.flash("success" , "Your Data is Inserted")
    return res.redirect('/');
}

module.exports.view_offer = async(req,res)=>{
    var search = '';
    if(req.query.search){
        search = req.query.search
    }

    let page = 0;
    if(req.query.page){
        page = req.query.page
    }
    limit = 2;

    let offerData = await offermodel.find({
        $or : [
            {title :{$regex  : ".*" + search + ".*" , $options : "i"}}
        ]
    })
    .skip(page*limit)
    .limit(2)

    let countoffer = await offermodel.find({
        $or : [
            {title :{$regex  : ".*" + search + ".*" , $options : "i"}}
        ]
    })
    .countDocuments();

    let setpage = Math.ceil(countoffer/limit);

    return res.render("view_offer" , {
        offerData : offerData,
        totalpage : setpage,
        search : search,
        currentpage : page
    })
}

module.exports.activedata = async(req,res) =>{
    let updatedata = await offermodel.findByIdAndUpdate(req.params.id,{isactive : false});
    return res.redirect("back");
}

module.exports.deactivedata = async(req,res)=>{
    let updatedata = await offermodel.findByIdAndUpdate(req.params.id,{isactive : true});
    return res.redirect("back");
}

module.exports.deleteRecord = async(req,res)=>{
    let oldData = await offermodel.findById(req.params.id);
    if(oldData){
        let removeData = await offermodel.findByIdAndDelete(oldData.id);
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
    let offerData = await offermodel.findById(req.params.id);
    return res.render("update_offer" , {
        offerData : offerData
    })
}

module.exports.EditRecord = async(req,res)=>{
    var EditId = req.body.EditId;
    let existOld = await offermodel.findById(req.body.EditId);
    if(existOld){
        delete(req.body.EditId);
        console.log(req.body);
        let updateRecord = await offermodel.findByIdAndUpdate(EditId,req.body);
        req.flash("success" , "your data is Updated");
        return res.redirect("/admin/offer/view_offer");
    }
    else{
        console.log("Record not found for update");
    }
    return res.redirect("back");
}

module.exports.multiofferdelete = async(req,res)=>{
    // console.log(req.body.delAll);
    await offermodel.deleteMany({'_id':{'$in':req.body.delAll}});
    return res.redirect("back");
}