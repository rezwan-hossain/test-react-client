const Post = require("../models/post");
const User = require("../models/User");
const slugfy = require("slugify");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.create = (req, res) => {
  const { title, content, user } = req.body;
  const slug = slugfy(title);

  switch (true) {
    case !title:
      return res.status(400).json({ error: "title is required" });
      break;
    case !content:
      return res.status(400).json({ error: "content is required" });
      break;
  }

  Post.create({ title, content, user, slug }, (err, post) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "try another title" });
    }
    res.json(post);
  });
};

exports.list = (req, res) => {
  Post.find({}).exec((err, post) => {
    if (err) {
      console.log(err);
    }
    res.json(post);
  });
};

exports.read = (req, res) => {
  const { slug } = req.params;

  Post.findOne({ slug }).exec((err, post) => {
    if (err) {
      console.log(err);
    }
    res.json(post);
  });
};

exports.update = (req, res) => {
  const { slug } = req.params;

  const { title, content, user } = req.body;

  Post.findOneAndUpdate({ slug }, { title, content, user }, { new: true }).exec(
    (err, post) => {
      if (err) {
        console.log(err);
      }
      res.json(post);
    }
  );
};

exports.remove = (req, res) => {
  const { slug } = req.params;

  Post.findOneAndRemove({ slug }).exec((err, post) => {
    if (err) {
      console.log(err);
    }
    res.json({
      message: "Post delete",
    });
  });
};

exports.register = (req, res) => {
  const hashPassword = bcrypt.hashSync(req.body.password, 8);

  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    },
    (err, user) => {
      if (err) {
        console.log(err);
        res.status(400).json({ error: "somthing went wrong" });
      }
      // create json web token
      const token = jwt.sign({ id: user._id }, "secret", { expiresIn: 86400 });
      res.status(200).send({
        token: token,
        id: user._id,
        name: user.name,
        email: user.email,
      });
    }
  );
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    console.log(user);
    if (err) {
      return res.status(500).send("The was a problem finding the user");
    }
    if (!user) {
      return res.status(404).send("User not found");
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        token: null,
      });
    }

    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: 86400 });
    res.status(200).send({
      token: token,
      id: user._id,
      name: user.name,
      email: user.email,
    });
  });
};

exports.userInfo = (req, res) => {
  const { id } = req.params;

  User.find({ _id: id }).exec((err, user) => {
    console.log(`hellow world ${user}`);
    if (err) {
      return res.status(500).send("The was a problem finding the user");
    }
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  });
};
