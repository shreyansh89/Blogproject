const slidermodel = require("../models/slidermodel");
const offermodel = require("../models/offermodel");
const postmodel = require("../models/postmodel");
const photomodel = require("../models/photomodel");
const othermodel = require("../models/othermodel");
const comment = require("../models/comments");
const category = require("../models/categorymodel");
const subcatagory = require("../models/subcatmodel");
const Contect = require("../models/contectmodel");

module.exports.home = async(req,res)=>{
    let sliderData = await slidermodel.find({isactive : true});
    let offerData = await offermodel.find({isactive : true});
    let postData = await postmodel.find({isactive : true});
    let photoData = await photomodel.find({isactive : true});
    let otherData = await othermodel.find({isactive : true});

    if(sliderData){
        return res.render("user/user_index",{
            sliderData : sliderData,
            offerData : offerData,
            postData : postData,
            photoData : photoData,
            otherData : otherData,
        }
    )}
}

module.exports.singleblog = async(req,res)=>{
    let singleblog = await postmodel.findById(req.params.id);

    let recentData = await postmodel.find().sort({'_id' : -1}).limit(3)

    let allPostIds = await postmodel.find({},{id : 1});
    // console.log(allPostIds);

    var next = -1;
    allPostIds.map((v,i)=>{
        if(v.id == req.params.id){
            next = i;
        }
    })

    var prev = -1;
    allPostIds.map((v,i)=>{
        if(v.id == req.params.id){
            prev = i;
        }
    })

    let commentBypost = await comment.find({'postId' : req.params.id,isactive : true});
    let commentByCount = await comment.find({'postId' : req.params.id,isactive : true}).countDocuments();

    return res.render("user/single-blog" , {
        blogDetails : singleblog,
        allComment : commentBypost,
        countComment : commentByCount,
        next : allPostIds[next+1]?allPostIds[next+1].id:undefined,
        prev : allPostIds[prev-1]?allPostIds[prev-1].id:undefined,
        recentData : recentData
    });
}

module.exports.addcomment = async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
    let commentpath = '';
    if(req.file){
        commentpath = comment.avatarpath+"/"+req.file.filename;
    }
    req.body.commentimage = commentpath;
    var datewithoutsecound = new Date();
    datewithoutsecound.toLocaleDateString([] , {year : "numeric" , month : 'numeric' , day : 'numeric' , hour :'2-digit' , minute : '2-digit'});
    req.body.datetime = datewithoutsecound;
    req.body.isactive = true;
    await comment.create(req.body);
    return res.redirect('back');
}

module.exports.workThreecolumn = async(req,res)=>{
    let catData = await category.find({isactive : true});
    let subData = await subcatagory.find({isactive : true});
    return res.render("user/workcolumn",{
        catData : catData,
        subData : subData
    });
}

module.exports.fourcolumn = async(req,res)=>{
    let catData = await category.find({isactive : true});
    let subData = await subcatagory.find({isactive : true});
    return res.render("user/fourcolumn",{
        catData : catData,
        subData : subData
    });
}

module.exports.contact = async(req,res)=>{
    return res.render("user/contact");
}

module.exports.addcontect = async(req,res)=>{
    // console.log(req.body);
    await Contect.create(req.body);
    return res.redirect("back");
  }