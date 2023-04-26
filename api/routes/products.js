const express = require("express");
const { findAllProducts,
  searchProduct ,
  findOneProduct,
  createProduct,
  searchByCategory ,
  deleteProducts,
  updateProduct,
  findProducts } = require("../controllers/products");
const router = express.Router();


router.get("/", findAllProducts);

router.get("/:productId", findOneProduct);


//buscar producto
router.get("/search/:productName", searchProduct);

router.post("/:userId", createProduct);


//Buscar por categorias
router.get("/filter/:categoryId", searchByCategory);


router.delete("/:productId", deleteProducts);


router.put("/:productId", updateProduct);

router.get("/search/:productName", findProducts);


module.exports = router;
