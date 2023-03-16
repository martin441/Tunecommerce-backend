const S = require("sequelize");
const db = require("../config/index");

class Order extends S.Model {}

Order.init(
  {
    status: { type: S.STRING },
    date: { type: S.STRING },
    paymentM: { type: S.STRING },
  },
  { sequelize: db, modelName: "order" }
);

module.exports = Order;
