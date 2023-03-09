const db = require("../config/index");

const Product = require("./Product");
const User = require("./User");
const Review = require("./Review");
const Notificacion = require("./Notificacion");
const Cart = require("./Cart");
const Cartitem = require("./Cartitem");
const Category = require("./Category");
const Order = require("./Order");
const Orderitem = require("./Orderitem");

User.hasMany(Product);
Product.belongsTo(User);

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);

Cartitem.belongsTo(Cart);
Cart.hasMany(Cartitem);

Cart.belongsTo(User);
User.hasOne(Cart);

Cartitem.belongsTo(Product);
Product.hasOne(Cartitem);

Order.hasMany(Orderitem);
Orderitem.belongsTo(Order);

Orderitem.belongsTo(Product);
Product.hasOne(Orderitem);

Order.belongsTo(User);
User.hasMany(Order);

Notificacion.belongsTo(User);
User.hasMany(Notificacion);

Notificacion.belongsTo(Order, {
  foreignKey: "status",
});
Order.hasMany(Notificacion);

module.exports = {
  Product,
  User,
  Review,
  Notificacion,
  Cart,
  Cartitem,
  Category,
  Order,
  Orderitem,
};
