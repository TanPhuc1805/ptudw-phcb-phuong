const express = require("express");
const router = express.Router();
const controller=require("../controllers/manageListController");

router.get("/",controller.show);
router.post("/editplace", controller.requestEditPlace);
router.post("/editads", controller.requestEditAds);
module.exports=router;