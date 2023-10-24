const express = require("express");

const route = express.Router();

const photocntroller = require("../controller/photocontroller");

const photomodel = require("../models/photomodel");

route.get("/add_photo" , photocntroller.add_photo);

route.post("/insertphoto" , photomodel.uplodeadavatar , photocntroller.insertphoto);

route.get("/view_photo" , photocntroller.view_photo);

route.get("/activedata/:id" , photocntroller.activedata);

route.get("/deactivedata/:id" , photocntroller.deactivedata);

route.get("/deleteRecord/:id" , photocntroller.deleteRecord);

route.get("/UpdateRecord/:id" , photocntroller.UpdateRecord);

route.post("/EditRecord" , photomodel.uplodeadavatar , photocntroller.EditRecord);

route.post("/multiphotodelete" , photocntroller.multiphotodelete);

module.exports = route;