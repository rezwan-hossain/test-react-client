const express = require("express");
const router = express.Router();

const { create, list, read, update, remove } = require("../controllers/post");

router.get("/users", list).post("/users", create);
router.get("/users/:slug", read);
router.put("/users/:slug", update);
router.delete("/users/:slug", remove);

module.exports = router;
