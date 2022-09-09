const {
  selectCategories,
  selectReviewById,
  selectUsers,
} = require(`../models/games.models`);

exports.getCategories = (req, res) => {
  selectCategories().then((data) => {
    res.status(200).send({ categories: data });
  });
};

exports.getReviewById = (req, res, next) => {
  selectReviewById(req.params.review_id)
    .then((data) => {
      res.status(200).send({ review: data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsers = (req, res) => {
  selectUsers().then((data) => {
    res.status(200).send({ users: data });
  });
};
