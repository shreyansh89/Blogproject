const contect = require("../models/contectmodel");

module.exports.view_contect = async(req,res) =>{
  var search = '';
  if(req.query.search){
      search = req.query.search
  }

  let ContectData = await contect.find({
      $or : [
          { name : {$regex : ".*" + search + ".*" , $options : "i"}}
      ]
  })

  return res.render("view_contect" , {
      ContectData : ContectData,
      search : search,
  })
}

module.exports.multiRecordDelete = async(req,res)=>{
  // console.log(req.body.delAll);
  await contect.deleteMany({'_id':{'$in':req.body.delAll}});
  return res.redirect("back");
}

module.exports.deleteRecord = async(req,res)=>{
  let oldData = await contect.findById(req.params.id);
  if(oldData){
      let removeData = await contect.findByIdAndDelete(oldData.id);
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