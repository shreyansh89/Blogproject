const mongoose = require("mongoose");

const otherSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    country : {
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
    }
});

const other = mongoose.model("other", otherSchema);
module.exports = other;