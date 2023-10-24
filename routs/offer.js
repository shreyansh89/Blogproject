const express = require("express");

const route = express.Router();

const offercontroller = require("../controller/offercontroller");

const offermodel = require("../models/offermodel");

route.get("/add_offer" , offercontroller.add_offer);

route.post("/insertoffer" ,offercontroller.insertoffer);

route.get("/view_offer" , offercontroller.view_offer);

route.get("/activedata/:id" , offercontroller.activedata);

route.get("/deactivedata/:id" , offercontroller.deactivedata);

route.get("/deleteRecord/:id" , offercontroller.deleteRecord);

route.get("/UpdateRecord/:id" , offercontroller.UpdateRecord);

route.post("/EditRecord" , offercontroller.EditRecord);

route.post("/multiofferdelete" , offercontroller.multiofferdelete);

module.exports = route;