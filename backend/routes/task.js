const router = require("express").Router();
const taskController = require('../controllers/task');
const auth = require("../middleware/auth");

router.post("/add",auth, taskController.createtask);
router.get("/gettasklist",auth, taskController.gettasks);
router.get("/gettasklist/:taskId", taskController.gettask);
router.put("/updatetask/:taskId", taskController.updatetask);
router.delete("/deletetask/:taskId",taskController.deletetask)


module.exports = router;
