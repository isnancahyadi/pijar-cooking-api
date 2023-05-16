const router = require("express").Router();
const controller = require("../controllers/user.controller");
const middleware = require("../middleware/jwt.middleware");

router.get("/user", middleware, controller.getUsers);
router.get("/user", middleware, controller.getSpecifiedUser);
router.post("/user", controller.createUser);
router.patch("/user", middleware, controller.updateUser);
router.delete("/user", middleware, controller.deleteUser);

module.exports = router;
