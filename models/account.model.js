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

module.exports = {
  regAccount,
  getEmailAccount,
};
