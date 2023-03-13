const express = require("express");
const router = express.Router();
const validateAuth = require("../middlewares/auth");
const User = require("../models/User");

// Promover usuarios administradores
router
  .put("/:userId", validateAuth, (req, res) => {
    if (!req.user) {
      return res
        .status(401)
        .send("Debe iniciar sesión para realizar esta acción");
    }

    if (!req.user.isAdmin) {
      return res
        .status(403)
        .send("No tienes permiso para realizar esta acción");
    }

    User.update(
      { isAdmin: req.body.isAdmin },
      { where: { id: req.params.userId } }
    );
  })
  .then(() => res.send("El usuario se actualizo correctmente!"))
  .catch(() => res.status(500).send("Hubo un error al actualizar el usuario"));

  
// Ver todos los usuarios
router.get("/", validateAuth, (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .send("Debe iniciar sesión para realizar esta acción");
  }
  User.findAll().then((usuarios) => res.send(usuarios));
});


// Eliminar usuarios
router.delete("/:userId", (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("No tienes permiso para realizar esta acción");
  }
  User.findByPk(req.params.userId).then((user) =>
    !user ? res.status(404).send("El usuario no existe") : user.destroy()
  );
});
