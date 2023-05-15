const model = require("../models/account.model");
const bcrypt = require("bcrypt");
const saltRounds = 14;
const response = require("../response");

const regAccount = async (req, res) => {
  const { username, email, password } = req.body;

  if (!(username && email && password)) {
    response(400, "ERROR", "Please complete all of field", null, res);
    return;
  }

  try {
    let payLoad = {
      username,
      email,
      password,
    };

    const getEmailAccount = await model.getEmailAccount(email);

    if (getEmailAccount) {
      if (getEmailAccount?.length) {
        response(409, "ERROR", "Email already registered", null, res);
        return;
      }
    } else {
      response(500, "ERROR", "WOW... Something wrong with server", null, res);
      return;
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      const query = await model.regAccount({ ...payLoad, password: hash });

      if (query) {
        response(201, "OK", "Account has been created", query, res);
        return;
      } else if (!query) {
        response(409, "ERROR", "Account already registered", null, res);
        return;
      } else {
        response(500, "ERROR", "WOW... Something wrong with server", null, res);
        return;
      }
    });
  } catch (error) {
    response(400, "ERROR", "Awww... Something wrong...", null, res);
    return;
  }
};

module.exports = {
  regAccount,
};
