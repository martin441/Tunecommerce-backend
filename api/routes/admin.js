const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Ver todos los usuarios
router.get("/", (req, res) => {
  User.findAll().then((usuarios) => res.send(usuarios));
});

// Promover usuarios administradores
router.put("/:userId", (req, res) => {
  User.update(
    { isAdmin: req.body.isAdmin },
    { where: { id: req.params.userId } }
  )
    .then(() => res.send("El usuario se actualizo correctmente!"))
    .catch(() =>
      res.status(500).send("Hubo un error al actualizar el usuario")
    );
});

// Eliminar usuarios
router.delete("/:userId", (req, res) => {
  User.findByPk(req.params.userId).then((user) =>
    !user
      ? res.status(404).send("El usuario no existe")
      : user.destroy().then(() => res.sendStatus(204))
  );
});

module.exports = router;
