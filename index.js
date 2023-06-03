// initial package
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// grant access to upload file
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// import route
const authRouth = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const recipeRoutes = require("./routes/recipe.route");

// use routing
app.use(authRouth);
app.use(userRoutes);
app.use(recipeRoutes);

// root
app.get("/", function (req, res) {
  res.send("Hello World");
});

// listener
app.listen(5000, () => {
  console.log("App is running...");
});
