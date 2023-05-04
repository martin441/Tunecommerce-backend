const S = require("sequelize");
const db = require("../config/index");

class Orderitem extends S.Model {}

Orderitem.init(
  {
    cantidad: { type: S.INTEGER },
  },
  { sequelize: db, modelName: "orderitem" }
);

module.exports = Orderitem;