const exprss = require("express");

const route = exprss.Router();

const categorycontroller = require("../controller/categorycontroller");

route.get("/add_category" , categorycontroller.add_category);

route.post("/insertCategory" , categorycontroller.insertCategory);

route.get("/view_category" , categorycontroller.view_category)

route.get("/deleterecord/:id" , categorycontroller.deleteRecord);

route.post("/deleteMultiRecord" , categorycontroller.deleteMultiRecord);

route.get("/activedata/:id" , categorycontroller.activeCategory);

route.get("/deactivedata/:id" , categorycontroller.deactiveCategory);

module.exports = route;