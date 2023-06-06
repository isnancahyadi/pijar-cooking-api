const model = require("../models/recipe.model");
const response = require("../response");
const paginate = require("../middleware/pagination.middleware");
const cloudinary = require("../cloudinary");

const getRecipes = async (req, res) => {
  const sort = (sortType) => {
    if (sortType) {
      if (
        sortType.toLowerCase() === "asc" ||
        sortType.toLowerCase() === "ascending"
      ) {
        return "ASC";
      } else if (
        sortType.toLowerCase() === "desc" ||
        sortType.toLowerCase() === "descending"
      ) {
        return "DESC";
      }
    } else return "ASC";
  };

  const search = (keyword) => (keyword ? keyword : false);

  try {
    const query = await model.getRecipes(
      search(req?.query?.search),
      sort(req?.query?.sort)
    );

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

const getNewRecipes = async (req, res) => {
  try {
    const query = await model.getNewRecipes();

    if (query) {
      response(200, "OK", "Get all data success", query, res);
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
  const { title, ingredients, video, direction } = req.body;
  const { image } = req?.files;

  if (!(title && ingredients && image && direction)) {
    response(400, "ERROR", "Please complete all of field", null, res);
    return;
  }

  try {
    let mimeType = image.mimetype.split("/")[1];
    let allowFile = ["jpeg", "jpg", "png", "webp"];

    if (!allowFile?.find((item) => item === mimeType)) {
      response(400, "ERROR", "Hey, What are you doing?", null, res);
      return;
    }

    if (image.size > 2000000) {
      response(400, "ERROR", "Image is too big", null, res);
      return;
    }

    const upload = cloudinary.uploader.upload(image.tempFilePath, {
      folder: "img/recipe",
      public_id: new Date().toISOString(),
    });

    upload
      .then(async (data) => {
        const payLoad = {
          title,
          ingredients,
          image: data?.secure_url,
          video,
          direction,
        };
        const query = await model.createRecipe(payLoad);

        if (query) {
          response(201, "OK", "Recipe has been created", null, res);
          return;
        } else {
          response(
            500,
            "ERROR",
            "WOW... Something wrong with server",
            null,
            res
          );
          return;
        }
      })
      .catch((err) => {
        response(400, "ERROR", "Awww... Something wrong...", null, res);
        return;
      });
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
  getNewRecipes,
  getSpecifiedRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
