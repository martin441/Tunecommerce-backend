const express = require("express");
const router = express.Router();
const { promoteAdmin,
  getAllUsers,
  deleteUsers,} = require("../controllers/admin")

// Promover usuarios administradores
router.put("/:userId", promoteAdmin);

// Ver todos los usuarios
router.get("/", getAllUsers);

// Eliminar usuarios
router.delete("/:userId", deleteUsers);

module.exports = router;
