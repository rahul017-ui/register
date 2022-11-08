const router = require("express").Router();
const userController = require('../controllers/User');
const auth = require('../middleware/auth');


router.post("/register", userController.createuser);
router.post('/login', userController.login);
router.get("/:id", auth, userController.getuser);
router.get("/status/:userId", userController.getstatus);
router.get("/", userController.getusers);
router.get("/gettasklist/:id", userController.getusertask)
router.put("/updateuser/:userId", userController.userupdate);
router.delete("/deleteUser/:userId", userController.deleteuser);
module.exports = router;
