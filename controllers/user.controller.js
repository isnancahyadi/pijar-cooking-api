const model = require("../models/user.model");
const jwt = require("jsonwebtoken");
const response = require("../response");
const paginate = require("../middleware/pagination.middleware");
const cloudinary = require("../cloudinary");

const getToken = (req) => {
  const token = req?.headers?.authorization?.slice(
    7,
    req?.headers?.authorization.length
  );

  return token;
};

const getUsers = async (req, res) => {
  const sort = (sortType) => {
    if (sortType) {
      if (
        sortType.toLowerCase() === "asc" ||
        sortType.toLowerCase() === "ascending"
      ) {
        return "ASC";
      } else if (
        sortType.toLowerCase() === "desc" ||
        sortType.toLowerCase() === "descending"
      ) {
        return "DESC";
      }
    } else return "ASC";
  };

  const search = (keyword) => (keyword ? keyword : false);

  try {
    jwt.verify(getToken(req), process.env.KEY, async (err, { role_id }) => {
      if (role_id !== 1) {
        response(403, "ERROR", "Access denied!!!", null, res);
        return;
      }
      try {
        const query = await model.getUsers(
          search(req?.query?.search),
          sort(req?.query?.sort)
        );

        if (query) {
          response(
            200,
            "OK",
            "Get all data success",
            paginate(req, query),
            res
          );
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
      } catch (error) {
        response(400, "ERROR", "Awww... Something wrong...", null, res);
        return;
      }
    });
  } catch (error) {}
};

const getSpecifiedUser = async (req, res) => {
  try {
    jwt.verify(getToken(req), process.env.KEY, async (err, { username }) => {
      const query = await model.getSpecifiedUser(username);

      if (query) {
        if (!query?.length) {
          response(404, "ERROR", "Hey, Who are you?", null, res);
          return;
        } else {
          response(200, "OK", "Get data success", query, res);
          return;
        }
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

const createUser = async (req, res) => {
  try {
    jwt.verify(getToken(req), process.env.KEY, async (err, { username }) => {
      const { fullname, phone_number, profile_picture } = req.body;

      if (!(fullname && phone_number)) {
        response(400, "ERROR", "Please complete all of field", null, res);
        return;
      }

      try {
        // const getEmailUser = await model.getEmailUser(email);

        // if (getEmailUser) {
        //   if (getEmailUser?.length) {
        //     response(409, "ERROR", "Email already registered", null, res);
        //     return;
        //   }
        // } else {
        //   response(500, "ERROR", "WOW... Something wrong with server", null, res);
        //   return;
        // }

        const payLoad = {
          fullname,
          // email,
          // password,
          phone_number,
          profile_picture,
          username,
        };

        const query = await model.createUser(payLoad);

        if (query) {
          response(201, "OK", "User has been created", null, res);
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
      } catch (error) {
        response(400, "ERROR", "Awww... Something wrong...", null, res);
        return;
      }
    });
  } catch (error) {
    response(400, "ERROR", "Awww... Something wrong...", null, res);
    return;
  }
};

const updateUser = async (req, res) => {
  try {
    jwt.verify(getToken(req), process.env.KEY, async (err, { username }) => {
      const {
        body: { fullname, phone_number, profile_picture },
      } = req;

      // const { profile_picture } = req?.files;

      const getSelectedData = await model.getSpecifiedUser(username);

      if (getSelectedData) {
        if (!getSelectedData?.length) {
          response(404, "ERROR", "Hey, Who are you?", null, res);
          return;
        }
      } else {
        response(500, "ERROR", "WOW... Something wrong with server", null, res);
        return;
      }

      // let mimeType = profile_picture.mimetype.split("/")[1];
      // let allowFile = ["jpeg", "jpg", "png", "webp"];

      // if (!allowFile?.find((item) => item === mimeType)) {
      //   response(400, "ERROR", "Hey, What are you doing?", null, res);
      //   return;
      // }

      // if (profile_picture.size > 2000000) {
      //   response(400, "ERROR", "Photo is too big", null, res);
      //   return;
      // }

      // const upload = cloudinary.uploader.upload(profile_picture.tempFilePath, {
      //   public_id: new Date().toISOString(),
      // });

      // upload
      //   .then(async (data) => {
      //     const payload = {
      //       photo: data?.secure_url,
      //     };

      //     model.editPhotoUser(payload, id);

      //     res.status(200).send({
      //       status: false,
      //       message: "Success upload",
      //       data: payload,
      //     });
      //   })
      //   .catch((err) => {
      //     res.status(400).send({
      //       status: false,
      //       message: err,
      //     });
      //   });

      const payLoad = {
        fullname: fullname ?? getSelectedData[0].fullname,
        // email: email ?? getSelectedData[0].email,
        // password: password ?? getSelectedData[0].password,
        phone_number: phone_number ?? getSelectedData[0].phone_number,
        profile_picture: profile_picture ?? getSelectedData[0].profile_picture,
      };

      const query = await model.updatedUser(username, payLoad);

      if (query) {
        response(201, "OK", "User has been updated", null, res);
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

const deleteUser = async (req, res) => {
  try {
    jwt.verify(getToken(req), process.env.KEY, async (err, { username }) => {
      const getSelectedData = await model.getSpecifiedUser(username);

      if (getSelectedData) {
        if (!getSelectedData?.length) {
          response(404, "ERROR", "Hey, Who are you?", null, res);
          return;
        }
      } else {
        response(500, "ERROR", "WOW... Something wrong with server", null, res);
        return;
      }

      const query = await model.deleteUser(username);

      if (query) {
        response(200, "OK", "User has been deleted", null, res);
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

const uploadPhoto = async (req, res) => {
  try {
    jwt.verify(getToken(req), process.env.KEY, async (err, { username }) => {
      const { photo } = req?.files;

      if (!photo) {
        response(400, "ERROR", "Photo is required", null, res);
        return;
      }

      let mimeType = photo.mimetype.split("/")[1];
      let allowFile = ["jpeg", "jpg", "png", "webp"];

      if (!allowFile?.find((item) => item === mimeType)) {
        response(400, "ERROR", "Hey, What are you doing?", null, res);
        return;
      }

      if (photo.size > 2000000) {
        response(400, "ERROR", "Photo is too big", null, res);
        return;
      }

      const upload = cloudinary.uploader.upload(photo.tempFilePath, {
        public_id: new Date().toISOString(),
      });

      upload
        .then(async (data) => {
          const payload = {
            profile_picture: data?.secure_url,
          };

          await model.updatePhotoUser(payload, username);

          response(201, "OK", "Photo has been updated", null, res);
          return;
        })
        .catch((err) => {
          response(400, "ERROR", "Awww... Something wrong...", null, res);
          return;
        });
    });
  } catch (error) {
    response(400, "ERROR", "Awww... Something wrong...", null, res);
    return;
  }
};

module.exports = {
  getUsers,
  getSpecifiedUser,
  createUser,
  updateUser,
  deleteUser,
  uploadPhoto,
};
