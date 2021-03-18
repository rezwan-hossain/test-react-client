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
} = require("../controllers/post");

router.post("/register", register);
router.post("/login", login);

router.get("/users", list).post("/users", create);
router.get("/users/:slug", read);
router.put("/users/:slug", update);
router.delete("/users/:slug", remove);

module.exports = router;
