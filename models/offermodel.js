const mongoose = require("mongoose");

const offerSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    isactive : {
        type : Boolean,
        required : true
    }
});

const offer = mongoose.model("offer", offerSchema);
module.exports = offer;