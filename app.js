const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cookieParser());

//const colors = ["red", "orange", "yellow", "green", "blue", "purple"];

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/cards", (req, res) => {
  res.locals.prompt = "Who is buried?";
  //res.locals.colors = colors;
  //res.locals.hint = "Hint here";
  res.render("card");
});

app.get("/hello", (req, res) => {
  res.render("hello", { name: req.cookies.username });
});

app.post("/hello", (req, res) => {
  res.cookie("username", req.body.username);
  //console.log(req.body.username);
  res.render("hello", { name: req.body.username });
});

app.listen(3000, () => {
  console.log("server running");
});
