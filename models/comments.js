const mongoose = require("mongoose");

const multer = require("multer");

const AVATAR_PATH = "/uploads/commentimage";

const path = require ("path");

const commentSchema = mongoose.Schema({
    postId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "post",
        required : true
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    commentimage : {
        type : String,
        required : true
    },
    isactive : {
        type : Boolean,
        required : true
    }
});

const storage1 = multer.diskStorage({
    destination :function(req , file,cb){
        cb(null,path.join(__dirname,"..",AVATAR_PATH));
    },

    filename:function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now());
    }

});

commentSchema.statics.uplodeadavatar = multer({storage:storage1}).single("commentimage");
commentSchema.statics.avatarpath = AVATAR_PATH;

const comment = mongoose.model("comment", commentSchema);
module.exports = comment;