const db = require("../config");

const getEmailAccount = async (email) => {
  try {
    const query = db`SELECT * FROM accounts WHERE email = ${email}`;
    return query;
  } catch (error) {
    console.log(error);
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
    return false;
  }
};

const checkAccount = async (username) => {
  try {
    const getEmail = await db`SELECT * FROM accounts WHERE email = ${username}`;
    const getUsername =
      await db`SELECT * FROM accounts WHERE username = ${username}`;

    if (getEmail || getUsername) {
      return getEmail ?? getUsername;
    } else {
      return 1;
    }
  } catch (error) {
    return 0;
  }
};

module.exports = {
  regAccount,
  getEmailAccount,
  checkAccount,
};
