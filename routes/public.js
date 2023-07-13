module.exports = [
  {
    path: "/auth/register",
    controller: require("../controllers/Auth").regAccount,
    validator: require("../controllers/Auth/validator").register,
    method: "post",
  },
  {
    path: "/recipe",
    controller: require("../controllers/Recipe").getAllRecipes,
    method: "get",
  },
  {
    path: "/user",
    controller: require("../controllers/Users").createUser,
    validator: require("../controllers/Users/validator").createUser,
    method: "post",
  },
];