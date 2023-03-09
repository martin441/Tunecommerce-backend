const express = require("express");
const router = express.Router();
const usersRouter = require("./users");
const cartsRouter = require(".cart/");

router.use("/user", usersRouter);
router.use("/cart", cartsRouter);

module.exports = router;
