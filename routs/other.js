const express = require("express");

const route = express.Router();

const othercontroller = require("../controller/othercontroller");

route.get("/add_other" , othercontroller.add_other);

route.post("/insertother" , othercontroller.insertother);

route.get("/view_other" , othercontroller.view_other);

route.get("/activedata/:id" , othercontroller.activedata);

route.get("/deactivedata/:id" , othercontroller.deactivedata);

route.get("/deleterecord/:id" , othercontroller.deleterecord);

route.get("/UpdateRecord/:id" , othercontroller.UpdateRecord)

route.post("/EditRecord" ,  othercontroller.EditRecord);

route.post("/deleteMultiRecord" , othercontroller.deleteMultiRecord);


module.exports = route;