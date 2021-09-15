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
  const name = req.cookies.username;
  if (name) {
    res.redirect("/welcome");
  } else {
    res.render("index", { name });
  }
});

app.post("/goodbye", (req, res) => {
  res.clearCookie("username");
  //res.render("goodbye");
  res.redirect("/");
});

app.get("/welcome", (req, res) => {
  if (req.cookies.username) {
    res.render("welcome", { name: req.cookies.username });
  } else {
    res.redirect("/");
  }
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
  //res.redirect("/welcome");
});

app.post("/", (req, res) => {
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
  console.log("error:", error);
});

app.listen(3000, () => {
  console.log("server running");
});
