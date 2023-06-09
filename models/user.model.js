const db = require("../config");

const getUsers = async (search, sort) => {
  const sortType = sort === "DESC" ? db`DESC` : db`ASC`;

  if (search) {
    let keyword = `%${search}%`;
    try {
      const query =
        await db`SELECT * FROM users WHERE LOWER(fullname) LIKE LOWER(${keyword}) ORDER BY fullname ${sortType}`;
      return query;
    } catch (error) {
      return;
    }
  }

  try {
    const query = await db`SELECT * FROM users ORDER BY fullname ${sortType}`;
    return query;
  } catch (error) {
    return;
  }
};

const getSpecifiedUser = async (username) => {
  try {
    const query = await db`SELECT * FROM users WHERE username = ${username}`;
    return query;
  } catch (error) {
    return;
  }
};

const getEmailUser = async (email) => {
  try {
    const query = await db`SELECT * FROM users WHERE email = ${email}`;
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
        "phone_number",
        "username"
      )}`;
      return true;
    } else {
      await db`INSERT INTO users ${db(
        payLoad,
        "fullname",
        "phone_number",
        "profile_picture",
        "username"
      )}`;
      return true;
    }
  } catch (error) {
    return;
  }
};

const updatedUser = async (username, payLoad) => {
  try {
    await db`UPDATE users set ${db(
      payLoad,
      "fullname",
      // "email",
      // "password",
      "phone_number",
      "profile_picture"
    )} WHERE username = ${username}`;
    return true;
  } catch (error) {
    return;
  }
};

const deleteUser = async (username) => {
  try {
    await db`DELETE FROM users WHERE username = ${username}`;
    return true;
  } catch (error) {
    return;
  }
};

const updatePhotoUser = async (payLoad, username) => {
  try {
    await db`UPDATE users set ${db(
      payLoad,
      "profile_picture"
    )} WHERE username = ${username}`;
  } catch (error) {}
};

module.exports = {
  getUsers,
  getSpecifiedUser,
  getEmailUser,
  createUser,
  updatedUser,
  deleteUser,
  updatePhotoUser,
};
