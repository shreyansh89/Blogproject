const mongoose = require("mongoose");

const multer = require("multer");

const AVATAR_PATH = "/uploads/p-image";

const path = require ("path");

const photoSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    p_image : {
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

photoSchema.statics.uplodeadavatar = multer({storage:storage1}).single("p_image");
photoSchema.statics.avatarpath = AVATAR_PATH;

const photo = mongoose.model("photo", photoSchema)
module.exports = photo;