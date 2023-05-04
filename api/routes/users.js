const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  updateUser,
  userData,
} = require("../controllers/users");

//Ruta para registro:
router.post("/register", register);

//Ruta para login:
router.post("/login", login);

// Ruta para el logout
router.post("/logout", logout);

// Ruta donde el usuario puede ver sus datos. el req.user se define en validateAuth
router.get("/me", userData);

//Ruta para modificar datos de usuario
router.put("/update/:id", updateUser);

module.exports = router;
