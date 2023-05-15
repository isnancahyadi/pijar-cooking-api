const db = require("../config");

const getRecipes = async () => {
  try {
    const query = await db`SELECT * FROM recipes`;
    return query;
  } catch (error) {
    return;
  }
};

const getSpecifiedRecipe = async (id) => {
  try {
    const query = await db`SELECT * FROM recipes WHERE id = ${id}`;
    return query;
  } catch (error) {
    return;
  }
};

const createRecipe = async (payLoad) => {
  try {
    if (payLoad.video === undefined) {
      delete payLoad.video;
      await db`INSERT INTO recipes ${db(
        payLoad,
        "title",
        "ingredients",
        "image"
      )}`;
      return true;
    } else {
      await db`INSERT INTO recipes ${db(
        payLoad,
        "title",
        "ingredients",
        "image",
        "video"
      )}`;
      return true;
    }
  } catch (error) {
    return;
  }
};

const updateRecipe = async (id, payLoad) => {
  try {
    const query = await db`UPDATE recipes set ${db(
      payLoad,
      "title",
      "ingredients",
      "image",
      "video"
    )} WHERE id = ${id}`;
    return true;
  } catch (error) {
    return;
  }
};

const deleteRecipe = async (id) => {
  try {
    await db`DELETE FROM recipes WHERE id = ${id}`;
    return true;
  } catch (error) {
    return;
  }
};

module.exports = {
  getRecipes,
  getSpecifiedRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
