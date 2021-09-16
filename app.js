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

app.set("view engine", "pug");

const mainRoutes = require("./routes");
const cardRoutes = require("./routes/cards");

app.use(mainRoutes);
app.use("/cards", cardRoutes);

app.use((req, res, next) => {
  const err = new Error("You f*cked up!");
  err.status = 500;
  next();
});

app.use((req, res, next) => {
  const err = new Error("Oh boy! You messed up. 404");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  //const err = new Error("Oh boy! You messed up.");
  res.locals.error = err;
  res.status(err.status);
  res.render("error");
  next();
});

app.listen(3000, () => {
  console.log("server running");
});
