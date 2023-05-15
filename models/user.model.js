const db = require("../config");

const getUsers = async () => {
  try {
    const query = await db`SELECT * FROM users`;
    return query;
  } catch (error) {
    return;
  }
};

const getSpecifiedUser = async (id) => {
  try {
    const query = await db`SELECT * FROM users WHERE id = ${id}`;
    return query;
  } catch (error) {
    return;
  }
};

const createUser = async (payLoad) => {
  try {
    if (payLoad.profile_picture === undefined) {
      delete payLoad.profile_picture;
      await db`INSERT INTO users ${db(
        payLoad,
        "fullname",
        "email",
        "password",
        "phone_number"
      )}`;
      return true;
    } else {
      await db`INSERT INTO users ${db(
        payLoad,
        "fullname",
        "email",
        "password",
        "phone_number",
        "profile_picture"
      )}`;
      return true;
    }
  } catch (error) {
    return;
  }
};

const updatedUser = async (id, payLoad) => {
  try {
    await db`UPDATE users set ${db(
      payLoad,
      "fullname",
      "email",
      "password",
      "phone_number",
      "profile_picture"
    )} WHERE id = ${id}`;
    return true;
  } catch (error) {
    return;
  }
};

const deleteUser = async (id) => {
  try {
    await db`DELETE FROM users WHERE id = ${id}`;
    return true;
  } catch (error) {
    return;
  }
};

module.exports = {
  getUsers,
  getSpecifiedUser,
  createUser,
  updatedUser,
  deleteUser,
};
