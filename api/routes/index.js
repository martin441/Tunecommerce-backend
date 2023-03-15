const router = require("express").Router();
const usersRouter = require("./users");
const cartsRouter = require("./cart");
const productsRouter = require("./products");
const orderRouter = require("./order");

router.use("/user", usersRouter);
router.use("/cart", cartsRouter);
router.use("/products", productsRouter);
router.use("/order", orderRouter);

module.exports = router;
