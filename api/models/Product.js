const S = require("sequelize");
const db = require("../config/index");

class Product extends S.Model {
  static findByName(name) {
    return User.findOne({ where: { name } });
  }
}

Product.init(
  {
    name: { type: S.STRING },
    description: { type: S.TEXT },
    price: { type: S.INTEGER },
    image: { type: S.ARRAY(S.STRING) },
    stock: { type: S.INTEGER },
    ranking: { type: S.ARRAY(S.INTEGER) },
  },
  { sequelize: db, modelName: "product" }
);

module.exports = Product;
