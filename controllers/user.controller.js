const model = require("../models/user.model");
const response = require("../response");

const getUsers = async (req, res) => {
  try {
    const query = await model.getUsers();
    if (query) {
      response(200, "OK", "Get all data success", query, res);
    } else {
      response(500, "ERROR", "WOW... Something wrong with server", null, res);
    }
  } catch (error) {
    response(400, "ERROR", "Awww... Something wrong...", null, res);
  }
};

const getSpecifiedUser = async (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    response(400, "ERROR", "Hey, What are you doing?", null, res);
    return;
  }

  try {
    const query = await model.getSpecifiedUser(id);

    if (query) {
      if (!query?.length) {
        response(404, "ERROR", "Hey, Who are you?", null, res);
        return;
      } else {
        response(200, "OK", "Get data success", query, res);
      }
    } else {
      response(500, "ERROR", "WOW... Something wrong with server", null, res);
    }
  } catch (error) {
    response(400, "ERROR", "Awww... Something wrong...", null, res);
  }
};

const createUser = async (req, res) => {
  const { fullname, email, password, phone_number, profile_picture } = req.body;

  if (!(fullname && email && password && phone_number)) {
    response(400, "ERROR", "Please complete all of field", null, res);
    return;
  }

  try {
    const payLoad = {
      fullname,
      email,
      password,
      phone_number,
      profile_picture,
    };
    const query = await model.createUser(payLoad);

    if (query) {
      response(201, "OK", "User has been created", null, res);
    } else {
      response(500, "ERROR", "WOW... Something wrong with server", null, res);
    }
  } catch (error) {
    response(400, "ERROR", "Awww... Something wrong...", null, res);
  }
};

const updateUser = async (req, res) => {
  const {
    params: { id },
    body: { fullname, email, password, phone_number, profile_picture },
  } = req;

  if (isNaN(id)) {
    response(400, "ERROR", "Hey, What are you doing?", null, res);
    return;
  }

  try {
    const getSelectedData = await model.getSpecifiedUser(id);

    if (getSelectedData) {
      if (!getSelectedData?.length) {
        response(404, "ERROR", "Hey, Who are you?", null, res);
        return;
      }
    } else {
      response(500, "ERROR", "WOW... Something wrong with server", null, res);
    }

    const payLoad = {
      fullname: fullname ?? getSelectedData[0].fullname,
      email: email ?? getSelectedData[0].email,
      password: password ?? getSelectedData[0].password,
      phone_number: phone_number ?? getSelectedData[0].phone_number,
      profile_picture: profile_picture ?? getSelectedData[0].profile_picture,
    };

    const query = await model.updatedUser(id, payLoad);

    if (query) {
      response(201, "OK", "User has been updated", null, res);
    } else {
      response(500, "ERROR", "WOW... Something wrong with server", null, res);
    }
  } catch (error) {
    response(400, "ERROR", "Awww... Something wrong...", null, res);
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    response(400, "ERROR", "Hey, What are you doing?", null, res);
    return;
  }

  try {
    const getSelectedData = await model.getSpecifiedUser(id);

    if (getSelectedData) {
      if (!getSelectedData?.length) {
        response(404, "ERROR", "Hey, Who are you?", null, res);
        return;
      }
    } else {
      response(500, "ERROR", "WOW... Something wrong with server", null, res);
    }

    const query = await model.deleteUser(id);

    if (query) {
      response(200, "OK", "User has been deleted", null, res);
    } else {
      response(500, "ERROR", "WOW... Something wrong with server", null, res);
    }
  } catch (error) {
    response(400, "ERROR", "Awww... Something wrong...", null, res);
  }
};

module.exports = {
  getUsers,
  getSpecifiedUser,
  createUser,
  updateUser,
  deleteUser,
};
