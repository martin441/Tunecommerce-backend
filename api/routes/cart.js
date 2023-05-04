const express = require("express");
const router = express.Router();
const {
  findCart,
  findOrCreateCart,
  deleteOneProduct,
  updateCart,
  deleteAllProducts
} = require("../controllers/cart");

router.get("/:userId", findCart);

router.post("/:userId/:productId", findOrCreateCart);

router.delete("/:userId/:productId", deleteOneProduct);

router.delete("/:userId", deleteAllProducts);

router.put("/:userId/:productId", updateCart);

module.exports = router;
