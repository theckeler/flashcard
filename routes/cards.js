const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.locals.prompt = "Who is buried?";
  res.render("card");
});

module.exports = router;
