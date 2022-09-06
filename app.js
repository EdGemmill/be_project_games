const express = require(`express`);
const { getCategories } = require("./controllers/games.controllers");

const app = express();

app.use(express.json());

app.get(`/api/categories`, getCategories);

app.all("*", (req, res) => {
  res.status(404).send({ message: "page not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: `Internal server error` });
});

module.exports = app;