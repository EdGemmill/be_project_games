const db = require("../db/connection");

exports.selectCategories = () => {
  return db.query(`SELECT * FROM categories`).then((data) => {
    return data.rows;
  });
};
exports.selectReviewById = (id) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id = $1`, [id])
    .then((data) => {
      if (data.rows.length === 0) {
        return Promise.reject({ statuscode: 404, message: `not found` });
      } else {
        return data.rows[0];
      }
    });
};

exports.selectUsers = () => {
  return db.query(`SELECT * FROM users`).then((data) => {
    return data.rows;
  });
};
