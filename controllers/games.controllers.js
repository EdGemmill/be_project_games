const { selectCategories } = require(`../models/games.models`);

exports.getCategories = (req, res) => {
  selectCategories().then((data) => {
    res.status(200).send({ categories: data });
  });
};
