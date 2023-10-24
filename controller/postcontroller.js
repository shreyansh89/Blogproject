const moment = require("moment");

const postmodel = require("../models/postmodel");

const path = require("path");

const fs = require("fs");
const comment = require("../models/comments");

module.exports.add_post = async(req,res)=>{
    return res.render("add_post")
}

module.exports.insertdata = async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
    var img = " ";
    if(req.file){
        img = await postmodel.avatarpath+"/"+req.file.filename;
    }
    req.body.post_image = img;
    req.body.name = req.user.name;
    let date = moment();
    req.body.postdata = date.format("MMM Do YY");      
    req.body.isactive = true;
    await postmodel.create(req.body);
    req.flash("success" , "Your Data is Inserted")
    return res.redirect("/admin/post/add_post");
}

module.exports.view_post = async(req,res)=>{
    // console.log(req.query.search);
    var search = '';
    if(req.query.search){
        search = req.query.search
    }

    var page = 0;
    if(req.query.page){
        page = req.query.page;
    }

    limit = 2;

    let postData = await postmodel.find({
        $or : [
                { category : {$regex : ".*" + search + ".*" , $options : "i"}},
                { title : {$regex : ".*" + search + ".*" , $options : "i"}},
                { name : {$regex : ".*" + search + ".*" , $options : "i"}}
              ]
    })
    .skip(page*limit)
    .limit(2);
    // console.log(postData);

    let countpost = await postmodel.find({
        $or : [
                { category : {$regex : ".*" + search + ".*" , $options : "i"}},
                { title : {$regex : ".*" + search + ".*" , $options : "i"}},
                { name : {$regex : ".*" + search + ".*" , $options : "i"}}
              ]
    })
    .countDocuments();
    // console.log(countpost);

    let setpage = Math.ceil(countpost/limit);
    // console.log(setpage);


    return res.render("view_post" , {
        postData : postData,
        totalpage : setpage,
        search : search,
        currentpage : page
    })
}

module.exports.active = async(req,res)=>{
    let update = await postmodel.findByIdAndUpdate(req.params.id,{isactive:false});
    return res.redirect("back");
}

module.exports.deactive = async(req,res)=>{
    let update = await postmodel.findByIdAndUpdate(req.params.id,{isactive:true});
    return res.redirect("back");
}

module.exports.deleteRecord = async(req,res)=>{
    let oldData = await postmodel.findById(req.params.id);
    if(oldData){
        var imgPath = path.join(__dirname,"..",oldData.post_image);
        if(imgPath){
            await fs.unlinkSync(imgPath);
        }
        let removeData = await postmodel.findByIdAndDelete(oldData.id);
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
    let postData = await postmodel.findById(req.params.id);
    return res.render('update_post',{
        postData : postData
    });
}

module.exports.EditRecord = async(req,res)=>{
    var EditId = req.body.EditId;
    let existOld = await postmodel.findById(req.body.EditId);
    if(existOld){
        if(req.file){
            var imgpath = path.join(__dirname,'..',existOld.post_image);
            console.log(imgpath);
            try{
                await fs.unlinkSync(imgpath);
            }
            catch(err){
                console.log(err);
            }
            var newImgPath = postmodel.avatarpath+'/'+req.file.filename;
            req.body.post_image = newImgPath;
        }
        else{
            let oldImg = existOld.post_image;
            req.body.post_image = oldImg;
        }
        delete(req.body.EditId);
        console.log(req.body);
        let updateRecord = await postmodel.findByIdAndUpdate(EditId,req.body);
        req.flash("success" , "your data is Updated");
        return res.redirect("/admin/post/view_post");
    }
    else{
        console.log("Record not found for update");
    }
    return res.redirect("back");
}

module.exports.deleteMultiRecord = async(req,res)=>{
    // console.log(req.body.delAll);
    await postmodel.deleteMany({'_id':{'$in':req.body.delAll}});
    return res.redirect("back");
}

module.exports.viewcomment = async(req,res) => {
      // console.log(req.query.search);
      var search = '';
      if(req.query.search){
          search = req.query.search
      }
  
      var page = 0;
      if(req.query.page){
          page = req.query.page;
      }
  
      limit = 2;
  
      let commentData = await comment.find({
          $or : [
                  { title : {$regex : ".*" + search + ".*" , $options : "i"}},
                  { name : {$regex : ".*" + search + ".*" , $options : "i"}}
                ]
      })
      .populate('postId')
      .skip(page*limit)
      .limit(2);
      // console.log(commentData);
  
      let countComment = await comment.find({
          $or : [
                  { title : {$regex : ".*" + search + ".*" , $options : "i"}},
                  { name : {$regex : ".*" + search + ".*" , $options : "i"}}
                ]
      })
      .populate('postId')
      .countDocuments();
      // console.log(countComment);
  
      let setpage = Math.ceil(countComment/limit);
      // console.log(setpage);

      
      return res.render("view_comment" , {
          commentData : commentData,
          totalpage : setpage,
          search : search,
          currentpage : page
      })
}

module.exports.deleteCommentRecord = async(req,res)=>{
    let oldData = await comment.findById(req.params.id);
    if(oldData){
        var imgPath = path.join(__dirname,"..",oldData.commentimage);
        if(imgPath){
            await fs.unlinkSync(imgPath);
        }
        let removeData = await comment.findByIdAndDelete(oldData.id);
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

module.exports.deleteCommentMultiRecord = async(req,res) => {
    // console.log(req.body.delAll);
    await comment.deleteMany({'_id':{'$in':req.body.delAll}});
    return res.redirect("back");
}

module.exports.activeComment = async(req,res) =>{3
    let updateComment = await comment.findByIdAndUpdate(req.params.id,{isactive:false});
    return res.redirect("back");
}

module.exports.deactivecomment = async(req,res) =>{
    let updateComment = await comment.findByIdAndUpdate(req.params.id,{isactive:true});
    return res.redirect("back");
}