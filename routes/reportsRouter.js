const express = require("express");
const router = express.Router();
const controller = require("../controllers/reportsController");

router.get("/", controller.show);
router.put("/handle-report", controller.handleReport);



module.exports = router;
