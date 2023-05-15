const model = require("../models/recipe.model");
const response = require("../response");
const paginate = require("../middleware/pagination.middleware");

const getRecipes = async (req, res) => {
  try {
    const query = await model.getRecipes();
    if (query) {
      response(200, "OK", "Get all data success", paginate(req, query), res);
      return;
    } else {
      response(500, "ERROR", "WOW... Something wrong with server", null, res);
      return;
    }
  } catch (error) {
    response(400, "ERROR", "Awww... Something wrong...", null, res);
    return;
  }
};

const getSpecifiedRecipe = async (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    response(400, "ERROR", "Hey, What are you doing?", null, res);
    return;
  }

  try {
    const query = await model.getSpecifiedRecipe(id);

    if (query) {
      if (!query?.length) {
        response(404, "ERROR", "Hey, Who are you?", null, res);
        return;
      } else {
        response(200, "OK", "Get data success", query, res);
        return;
      }
    } else {
      response(500, "ERROR", "WOW... Something wrong with server", null, res);
      return;
    }
  } catch (error) {
    response(500, "ERROR", "Error in server", [], res);
    return;
  }
};

const createRecipe = async (req, res) => {
  const { title, ingredients, image, video } = req.body;

  if (!(title && ingredients && image)) {
    response(400, "ERROR", "Please complete all of field", null, res);
    return;
  }

  try {
    const payLoad = { title, ingredients, image, video };
    const query = await model.createRecipe(payLoad);

    if (query) {
      response(201, "OK", "User has been created", null, res);
      return;
    } else {
      response(500, "ERROR", "WOW... Something wrong with server", null, res);
      return;
    }
  } catch (error) {
    response(400, "ERROR", "Awww... Something wrong...", null, res);
    return;
  }
};

const updateRecipe = async (req, res) => {
  const {
    params: { id },
    body: { title, ingredients, image, video },
  } = req;

  if (isNaN(id)) {
    response(400, "ERROR", "Hey, What are you doing?", null, res);
    return;
  }

  try {
    const getSelectedData = await model.getSpecifiedRecipe(id);

    if (getSelectedData) {
      if (!getSelectedData?.length) {
        response(404, "ERROR", "Hey, Who are you?", null, res);
        return;
      }
    } else {
      response(500, "ERROR", "WOW... Something wrong with server", null, res);
      return;
    }

    const payLoad = {
      title: title ?? getSelectedData[0].title,
      ingredients: ingredients ?? getSelectedData[0].ingredients,
      image: image ?? getSelectedData[0].image,
      video: video ?? getSelectedData[0].video,
    };

    const query = await model.updateRecipe(id, payLoad);

    if (query) {
      response(201, "OK", "Recipe has been updated", null, res);
      return;
    } else {
      response(500, "ERROR", "WOW... Something wrong with server", null, res);
      return;
    }
  } catch (error) {
    response(400, "ERROR", "Awww... Something wrong...", null, res);
    return;
  }
};

const deleteRecipe = async (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    response(400, "ERROR", "Hey, What are you doing?", null, res);
    return;
  }

  try {
    const getSelectedData = await model.getSpecifiedRecipe(id);

    if (getSelectedData) {
      if (!getSelectedData?.length) {
        response(404, "ERROR", "Hey, Who are you?", null, res);
        return;
      }
    } else {
      response(500, "ERROR", "WOW... Something wrong with server", null, res);
      return;
    }

    const query = await model.deleteRecipe(id);

    if (query) {
      response(200, "OK", "Recipe has been deleted", null, res);
      return;
    } else {
      response(500, "ERROR", "WOW... Something wrong with server", null, res);
      return;
    }
  } catch (error) {
    response(400, "ERROR", "Awww... Something wrong...", null, res);
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
