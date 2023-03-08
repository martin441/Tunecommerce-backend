const S = require("sequelize");
const db = require("../config/index");

class Orderitem extends S.Model {}

Orderitem.init(
  {
    //orderId: { type: S.INTEGER },
    //productId: { type: S.INTEGER },
    cantidad: { type: S.INTEGER },
  },
  { sequelize: db, modelName: "orderitem" }
);

module.exports = Orderitem;