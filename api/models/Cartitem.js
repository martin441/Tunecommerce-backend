const S = require("sequelize");
const db = require("../config/index");

class Cartitem extends S.Model {}

Cartitem.init(
  {
    //cartId: { type: S.INTEGER },
    //productId: { type: S.INTEGER },
    cantidad: { type: S.INTEGER },
  },
  { sequelize: db, modelName: "cartitem" }
);

module.exports = Cartitem;
