const db = require("../config");

const getRecipes = async (search, sort) => {
  const sortType = sort === "DESC" ? db`DESC` : db`ASC`;

  if (search) {
    let keyword = `%${search}%`;
    try {
      const query =
        await db`SELECT * FROM recipes WHERE LOWER(title) LIKE LOWER(${keyword}) ORDER BY title ${sortType}`;
      return query;
    } catch (error) {
      return;
    }
  }

  try {
    const query = await db`SELECT * FROM recipes ORDER BY title ${sortType}`;
    return query;
  } catch (error) {
    return;
  }
};

const getNewRecipes = async () => {
  try {
    const query = await db`SELECT * FROM recipes ORDER BY id DESC LIMIT 1`;
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
        "image",
        "direction"
      )}`;
      return true;
    } else {
      await db`INSERT INTO recipes ${db(
        payLoad,
        "title",
        "ingredients",
        "image",
        "video",
        "direction"
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
  getNewRecipes,
  getSpecifiedRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
