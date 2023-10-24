const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    isactive : {
        type : Boolean,
        required : true
    },
});

const category = mongoose.model("category", CategorySchema);
module.exports = category;