const mongoose = require("mongoose");

const multer = require("multer");

const AVATAR_PATH = "/uploads/subcatimage";

const path = require ("path");

const subcategorySchema = mongoose.Schema({
    cstegoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category',
        required : true
    },
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    subcat_image : {
        type : String,
        required : true
    },
    isactive : {
        type : Boolean,
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

subcategorySchema.statics.uplodeadavatar = multer({storage:storage1}).single("subcat_image");
subcategorySchema.statics.avatarpath = AVATAR_PATH;

const subcatagory = mongoose.model("subcatagory", subcategorySchema);
module.exports = subcatagory;