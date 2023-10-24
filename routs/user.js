const express = require("express");

const route = express.Router();

const usercontroller =  require("../controller/usercontroller");

const comment = require("../models/comments");

route.get("/" ,usercontroller.home);

route.get("/singleblog/:id" , usercontroller.singleblog);

route.post("/addcomment" , comment.uplodeadavatar , usercontroller.addcomment);

route.get("/workThreecolumn" , usercontroller.workThreecolumn);

route.get("/fourcolumn" , usercontroller.fourcolumn);

route.get("/contact" , usercontroller.contact);

route.post("/addcontect" , usercontroller.addcontect);

module.exports = route; 