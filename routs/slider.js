const express = require("express");

const route = express.Router();

const slidercontroller =  require("../controller/slidercontroller");

const slidermodel = require("../models/slidermodel");

route.get("/add_slider" , slidercontroller.add_slider);

route.post("/insertslider" , slidermodel.uplodeadavatar , slidercontroller.insertslider);

route.get("/view_slider" , slidercontroller.view_slider);

route.get("/activedata/:id" , slidercontroller.activedata);

route.get("/deactivedata/:id" , slidercontroller.deactive);

route.get("/deleteRecord/:id" , slidercontroller.deleteRecord);

route.get("/UpdateRecord/:id" , slidercontroller.UpdateRecord);

route.post("/EditRecord" , slidermodel.uplodeadavatar , slidercontroller.EditRecord);

route.post("/multisliderdelete" , slidercontroller.multisliderdelete);

module.exports = route;