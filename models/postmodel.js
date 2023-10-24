const mongoose = require("mongoose");

const multer = require("multer");

const AVATAR_PATH = "/uploads/postimage";

const path = require ("path");

const postSchema = mongoose.Schema({
   
    name : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    postdata : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    isactive : {
        type : Boolean,
        required : true
    },
    post_image : {
        type : String,
        required : true
    },

});

const storage1 = multer.diskStorage({
    destination :function(req , file,cb){
        cb(null,path.join(__dirname,"..",AVATAR_PATH));
    },

    filename:function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now());
    }

});

postSchema.statics.uplodeadavatar = multer({storage:storage1}).single("post_image");
postSchema.statics.avatarpath = AVATAR_PATH;

const post = mongoose.model("post", postSchema);
module.exports = post;