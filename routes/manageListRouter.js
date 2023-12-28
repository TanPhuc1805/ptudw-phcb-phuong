const express = require("express");
const router = express.Router();
const controller=require("../controllers/manageListController");
const upload = require("../middlewares/multer");


router.get("/",controller.show);
router.post("/editplace", controller.requestEditPlace);
router.post("/editads",upload.single('ImageUrl'), controller.requestEditAds);
module.exports=router;