const { selectCategories } = require(`../models/games.models`);

exports.getCategories = (req, res) => {
  // console.log(`ANYTHING`);
  selectCategories().then((data) => {
    res.status(200).send({ categories: data });
  });
};
