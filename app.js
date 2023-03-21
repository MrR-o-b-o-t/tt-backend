const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const projectsRoutes = require("./routes/projects-routes");
const usersRoutes = require("./routes/users-routes");

const app = express();

app.use(bodyParser.json());

app.use("/api/projects", projectsRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new Error("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://samkautz:ORaH98zM4Vh7COaL@titus.t60y44l.mongodb.net/projects?retryWrites=true&w=majority"
  )
  .then(app.listen(5000))
  .catch((err) => {
    console.log(err);
  });
