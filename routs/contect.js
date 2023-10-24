const express = require("express");

const route = express.Router();

const contectcontrollert = require("../controller/contectcontroller");

route.get("/view_contect" , contectcontrollert.view_contect);

route.post("/multiRecordDelete" , contectcontrollert.multiRecordDelete);

route.get("/deleteRecord/:id" , contectcontrollert.deleteRecord);

module.exports = route;