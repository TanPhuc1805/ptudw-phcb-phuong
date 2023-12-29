const express = require("express");
const router = express.Router();
const controller=require("../controllers/requestsController");
const upload = require("../middlewares/multer");

router.get("/",controller.show);
router.post("/request",upload.single('ImageUrl'), controller.addRequest);
router.put("/editRequest",upload.single('ImageUrl'),controller.editRequest);
router.delete("/request/:id", controller.deleteRequest);
module.exports=router;