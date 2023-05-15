const router = require("express").Router();
const controller = require("../controllers/user.controller");

router.get("/user", controller.getUsers);
router.get("/user/:id", controller.getSpecifiedUser);
router.post("/user", controller.createUser);
router.patch("/user/:id", controller.updateUser);
router.delete("/user/:id", controller.deleteUser);

module.exports = router;
