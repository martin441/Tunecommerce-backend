const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

// Crear categorias
router.post("/", createCategory);

// Obtener todas las categorias
router.get("/todo", getCategories);

// Editar categorias
router.put("/:id", updateCategory);

// Eliminar una categoria
router.delete("/:id", deleteCategory);

module.exports = router;
