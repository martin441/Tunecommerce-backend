const S = require("sequelize");
const db = require("../config/index");

class Order extends S.Model {}

Order.init(
  {
    //userId: { type: S.INTEGER },
    status: {type: S.STRING},
    date: {type: S.DATE},
    paymentM: {type: S.STRING}
  },
  { sequelize: db, modelName: "order" }
);

module.exports = Order;