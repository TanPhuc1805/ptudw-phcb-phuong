const express = require("express");
const router = express.Router();
const controller=require("../controllers/manageListController");

router.get("/",controller.show);

module.exports=router;