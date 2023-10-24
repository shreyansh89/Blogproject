const express = require("express");

const route = express.Router();

const Subcategory = require("../models/subcatmodel");

const subcatagorycontroller = require("../controller/subcatcontroller");

route.get("/add_subcategory" , subcatagorycontroller.add_subcategory);

route.post("/insertSubcategory" , Subcategory.uplodeadavatar,subcatagorycontroller.insertSubcategory)

route.get("/view_subcategory" , subcatagorycontroller.view_subcategory);

route.get("/deleterecord/:id" , subcatagorycontroller.deleterecord);

route.get("/activedata/:id" , subcatagorycontroller.activedata);

route.get("/deactivedata/:id" , subcatagorycontroller.deactivedata);

route.post("/multiRecorddelete" , subcatagorycontroller.multiRecorddelete);

module.exports = route;