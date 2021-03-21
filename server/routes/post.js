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


//creating a middlewere for jwt verify token 
const verifyToken = ((req, res,next){
  token = req.headers['x-access-token'];

  if(!token){
    return res.status(401).send({
      auth: false,
      message: 'no token provides'      
    })
  }

  jwt.verify(token, 'secret', (err, data)=>{
    if(err){
      return res.status(500).send({

        auth: false,
        message: 'Failed to authenticate token'
      })
    }
    req.userId =data.id
  })
});

module.exports = router;
