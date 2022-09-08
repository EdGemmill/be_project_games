const express = require("express");
const app = express();
const {
  getCategories,
  getReviewById,
} = require("./controllers/games.controllers");

app.get(`/api/categories`, getCategories);

app.get(`/api/reviews/:review_id`, getReviewById);

app.all("*", (req, res) => {
  res.status(404).send({ message: "page not found" });
});

app.use((err, req, res, next) => {
  if (err.code === `22P02`) {
    res.status(400).send({ message: `bad request` });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.statuscode && err.message) {
    res.status(err.statuscode).send({ message: err.message });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: `internal server error` });
});

module.exports = app;
