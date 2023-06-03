const router = require("express").Router();
const controller = require("../controllers/user.controller");
const middleware = require("../middleware/jwt.middleware");

router.get("/users", middleware, controller.getUsers);
router.get("/user", middleware, controller.getSpecifiedUser);
router.post("/user", middleware, controller.createUser);
router.patch("/user", middleware, controller.updateUser);
router.delete("/user", middleware, controller.deleteUser);
router.patch("/user/photo", middleware, controller.uploadPhoto);

module.exports = router;
