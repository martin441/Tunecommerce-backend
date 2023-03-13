const router = require("express").Router();
const usersRouter = require("./users");
const cartsRouter = require("./cart");
const productsRouter = require("./products")
const adminRouter = require("./admin")

router.use("/user", usersRouter);
router.use("/cart", cartsRouter);
router.use('/admin', adminRouter);
router.use('/products', productsRouter);


module.exports = router;
