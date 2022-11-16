const router = require("express").Router();
const userController = require('../controllers/User');
const auth = require('../middleware/auth');


router.post("/register", userController.createUser);
router.post('/login', userController.login);
// router.get("/:id", auth, userController.getuser);
router.get("/status/:userId", userController.getStatus);
router.get("/", userController.getUsers);
router.put("/updateuser/:userId",auth, userController.userUpdate);
router.delete("/deleteUser/:userId", userController.deleteUser);



module.exports = router;
