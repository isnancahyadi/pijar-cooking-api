const db = require("../config");

const getEmailAccount = async (email) => {
  try {
    const query = db`SELECT * FROM accounts WHERE email = ${email}`;
    return query;
  } catch (error) {
    return;
  }
};

const getUsernameAccount = async (username) => {
  try {
    const query = db`SELECT * FROM accounts WHERE username = ${username}`;
    return query;
  } catch (error) {
    return;
  }
};

const regAccount = async (payLoad) => {
  try {
    const query = await db`INSERT INTO accounts ${db(
      { ...payLoad, role_id: 2 },
      "username",
      "email",
      "password",
      "role_id"
    )} returning username`;

    return query;
  } catch (error) {
    return;
  }
};

const checkAccount = async (username) => {
  try {
    const query =
      await db`SELECT * FROM accounts WHERE username = ${username} OR email = ${username}`;

    return query ? query : 1;
  } catch (error) {
    return 0;
  }
};

module.exports = {
  regAccount,
  getEmailAccount,
  getUsernameAccount,
  checkAccount,
};
