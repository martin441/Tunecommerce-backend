const S = require("sequelize");
const db = require("../config/index");

class Cart extends S.Model {}

Cart.init({}, { sequelize: db, modelName: "cart" });

module.exports = Cart;
