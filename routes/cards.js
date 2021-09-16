const express = require("express");
const router = express.Router();
const { data } = require("../data/flashcard.json");
const { cards } = data;

router.get("/:id", (req, res) => {
  const { side } = req.query;
  const { id } = req.params;
  const text = cards[id][side];
  const { hint } = cards[id];
  const templateData = { text, hint, side };

  // res.locals.prompt = cards[req.params.id].question;
  // res.locals.hint = cards[req.params.id].hint;
  res.render("card", templateData);
});

module.exports = router;
