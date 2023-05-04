const router = require("express").Router();
const usersRouter = require("./users");
const cartsRouter = require("./cart");

const productsRouter = require("./products");
const orderRouter = require("./order");
const adminRouter = require("./admin")
const categoryRouter = require("./category")

router.use("/user", usersRouter);
router.use("/cart", cartsRouter);
router.use("/products", productsRouter);
router.use("/order", orderRouter);
router.use('/categories', categoryRouter);
router.use('/admin', adminRouter);


module.exports = router;
