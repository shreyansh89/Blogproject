const express = require("express");

const route = express.Router();

const postcontroller = require("../controller/postcontroller");

const postmodel = require("../models/postmodel");

route.get("/add_post" , postcontroller.add_post);

route.post("/insertdata" , postmodel.uplodeadavatar , postcontroller.insertdata);

route.get("/view_post" , postcontroller.view_post);

route.get("/active/:id" , postcontroller.active);

route.get("/deactive/:id" , postcontroller.deactive);

route.get("/deleteRecord/:id" , postcontroller.deleteRecord);

route.get("/UpdateRecord/:id" , postcontroller.UpdateRecord);

route.post("/EditRecord" , postmodel.uplodeadavatar , postcontroller.EditRecord);

route.post("/deleteMultiRecord" , postcontroller.deleteMultiRecord);

route.get("/view_comment" , postcontroller.viewcomment);

route.get("/deleteCommentRecord/:id" , postcontroller.deleteCommentRecord);

route.post("/deleteCommentMultiRecord" , postcontroller.deleteCommentMultiRecord);

route.get("/activeComment/:id" , postcontroller.activeComment);

route.get("/deactivecomment/:id" , postcontroller.deactivecomment);

module.exports = route;