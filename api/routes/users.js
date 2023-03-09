const express = require("express");
const router = express.Router();
const { generateToken, validateToken } = require("../config/token");
const validateAuth = require("../middlewares/auth");
// const controller = require("../controllers/user")
const User = require("../models/User");

//Ruta para registro:
router.post("/register", (req, res, next) => {
  User.create(req.body)
    .then((userCreado) => res.status(201).send(userCreado.dataValue))
    .catch(next);
});

//Ruta para login:
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) return res.sendStatus(401);
      user.validatePassword(password).then((isValid) => {
        if (!isValid) return res.sendStatus(401);
        const payload = {
          email: user.email,
          password: user.password,
        };
        const token = generateToken(payload);
        res.cookie("token", token).send(user);
      });
    })
    .catch(next);
});

// Ruta para el logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

//Ruta donde el usuario puede ver sus datos. el req.user se define en validateAuth
router.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

router.put("/update/:id", (req, res) => {
  const { celnumber, address, email, password, isAdmin } = req.body;
  User.findOne({
    where: {
      id: req.params.id,
    },
  }).then((user) => {
    user
      .update({ celnumber, address, email, password, isAdmin })
      .then((changes) => res.send(changes))
      .catch((error) => {
        console.error(error);
        res.status(401).send("Error al actualizar los datos del usuario");
      });
  });
});

module.exports = router;
