const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const {
  create,
  list,
  read,
  update,
  remove,
  register,
  login,
  userInfo,
} = require("../controllers/post");

router.post("/register", register);
router.post("/login", login);

router.get("/users", list).post("/users", create);
router.put("/users/:slug", update);
router.delete("/users/:slug", remove);
router.get("/users/:id", userInfo);
router.get("/users/:slug", verifyToken, read);

//creating a middlewere for jwt verify token
function verifyToken(req, res, next) {
  var token = req.headers["x-access-token"];

  if (!token) {
    return res.status(400).send({
      auth: false,
      message: "no token provided",
    });
  }
  jwt.verify(token, "secret", (err, data) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: "Failed to authenticate token",
      });
    }
    req.userId = data.id;
    next();
  });
}

module.exports = router;
