const router = require("express").Router();
const controller = require("../controllers/auth.controller");

router.post("/auth/register", controller.regAccount);
router.post("/auth/login", controller.login);

module.exports = router;
