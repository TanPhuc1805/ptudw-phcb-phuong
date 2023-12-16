const express = require("express");
const router = express.Router();
const controller=require("../controllers/requestsController");

router.get("/",controller.show);
router.post("/request", controller.addRequest);
router.put("/request",controller.editRequest);
router.delete("/request/:id", controller.deleteRequest);
module.exports=router;