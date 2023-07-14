const model = require("../../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const response = require("../../utils/response");

const saltRounds = 14;

module.exports = {
  regAccount: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const mail = email.toLowerCase();
      const payload = { username, email: mail, password };

      const getEmailAccount = await model.getEmailAccount(mail);

      if (getEmailAccount) {
        if (getEmailAccount?.length) {
          response(409, "ERROR", "Email already registered", null, res);
          return;
        }
      } else {
        response(500, "ERROR", "WOW... Something wrong with server", null, res);
        return;
      }

      const getUsernameAccount = await model.getUsernameAccount(username);

      if (getUsernameAccount) {
        if (getUsernameAccount?.length) {
          response(409, "ERROR", "Account already registered", null, res);
          return;
        }
      } else {
        response(500, "ERROR", "WOW... Something wrong with server", null, res);
        return;
      }

      bcrypt.hash(password, saltRounds, async (err, hash) => {
        const query = await model.regAccount({ ...payload, password: hash });

        if (query) {
          response(201, "OK", "Account has been created", query, res);
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
      });
    } catch (error) {
      response(400, "ERROR", "Awww... Something wrong...", null, res);
      return;
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const checkAccount = await model.checkAccount(username);

      if (checkAccount) {
        if (!checkAccount?.length || checkAccount === 1) {
          response(404, "ERROR", "Account not found", null, res);
          return;
        }
      } else {
        response(500, "ERROR", "WOW... Something wrong with server", null, res);
        return;
      }

      bcrypt.compare(password, checkAccount[0]?.password, (err, result) => {
        if (result) {
          delete checkAccount[0].password;
          const token = jwt.sign(checkAccount[0], process.env.KEY);

          response(
            200,
            "OK",
            "Login success",
            { ...checkAccount[0], token },
            res
          );
          return;
        } else {
          response(401, "ERROR", "Password invalid", null, res);
          return;
        }
      });
    } catch (error) {
      response(400, "ERROR", "Awww... Something wrong...", null, res);
      return;
    }
  },
};
