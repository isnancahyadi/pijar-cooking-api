const jwt = require("jsonwebtoken");
const response = require("../response");

const checkToken = (req, res, next) => {
  const token = req?.headers?.authorization?.slice(
    7,
    req?.headers?.authorization.length
  );

  if (!token) {
    response(403, "ERROR", "Access denied!!!", null, res);
    return;
  }

  jwt.verify(token, process.env.KEY, function (err, decoded) {
    if (err) {
      response(401, "ERROR", "Hey, Who are you?", null, res);
      return;
    } else {
      next();
    }
  });
};

module.exports = checkToken;
