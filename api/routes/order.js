const express = require("express");
const router = express.Router();
const {
  searchOrder,
  searchOrders,
  generatePurchase,
  updatePurchase,
} = require("../controllers/order");

//buscar una orden y sus elementos
router.get("/:userId/:orderId", searchOrder);

//buscar historial de ordenes de un usuario
router.get("/:userId", searchOrders);

router.post("/:userId", generatePurchase);

router.put("/:userId/:orderId", updatePurchase);

module.exports = router;
