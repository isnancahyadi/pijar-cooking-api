const router = require("express").Router();
const controller = require("../controllers/recipe.controller");

router.get("/recipe", controller.getRecipes);
router.get("/recipe/new", controller.getNewRecipes);
router.get("/recipe/:id", controller.getSpecifiedRecipe);
router.post("/recipe", controller.createRecipe);
router.patch("/recipe/:id", controller.updateRecipe);
router.delete("/recipe/:id", controller.deleteRecipe);

module.exports = router;
