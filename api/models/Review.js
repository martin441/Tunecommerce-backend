const S = require("sequelize");
const db = require("../config/index");

class Review extends S.Model {}

Review.init(
  {
    description: { type: S.TEXT },
    date: { type: S.DATE },
  },
  { sequelize: db, modelName: "review" }
);

module.exports = Review;
