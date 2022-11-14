const router = require("express").Router();
const taskController = require('../controllers/task');
const auth = require("../middleware/auth");

router.post("/add",auth, taskController.createtask);
router.get("/gettasklist", taskController.gettasks);
router.get("/gettasklist/:taskId", taskController.gettask);
router.put("/updatetask/:taskId", taskController.updatetask);


module.exports = router;
