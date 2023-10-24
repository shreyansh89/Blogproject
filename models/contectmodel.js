const mongoose = require("mongoose");

const contectSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    subject : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
});

const contect = mongoose.model("contect", contectSchema);
module.exports = contect;