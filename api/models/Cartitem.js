const S = require("sequelize");
const db = require("../config/index");

class Cartitem extends S.Model {}

Cartitem.init(
  {
    cantidad: { type: S.INTEGER },
  },
  { sequelize: db, modelName: "cartitem", timestamps: false }
);

module.exports = Cartitem;
