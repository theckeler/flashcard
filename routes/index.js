const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.redirect("/welcome");
  } else {
    res.render("index", { name });
  }
});

router.post("/goodbye", (req, res) => {
  res.clearCookie("username");
  res.redirect("/");
});

router.get("/welcome", (req, res) => {
  if (req.cookies.username) {
    res.render("welcome", { name: req.cookies.username });
  } else {
    res.redirect("/");
  }
});

router.get("/hello", (req, res) => {
  res.render("hello", { name: req.cookies.username });
});

router.post("/hello", (req, res) => {
  res.cookie("username", req.body.username);
  res.render("hello", { name: req.body.username });
});

router.post("/", (req, res) => {
  let error = 0;
  if (req.body.username) {
    res.cookie("username", req.body.username);
    res.redirect("/welcome");
  } else {
    if (!req.body.username) {
      error = 1;
    }
    res.render("index", { error: error });
  }
});

module.exports = router;
