const express = require("express");
const router = express.Router();
const controller=require("../controllers/reportsController");

//router.post("/request", controller.addRequest);
router.get("/",controller.show);

module.exports=router;