const express = require("express");
const router = express.Router();
const { generateToken, validateToken } = require("../config/token");
const validateAuth = require("../middlewares/auth");
// const controller = require("../controllers/user")
const User = require("../models/User")

//Ruta para registro:
router.post("/register", (req, res) => {
  User.create(req.body).then((userCreado) =>
    res.status(201).send(userCreado.dataValue)
  );
});

//Ruta para login:
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } }).then((user) => {
    if(user) return res.sendStatus(401);

    user.validatePassword(password).then((isValid) => {if(!isValid) return res.sendStatus(401)})
    
    user.validatePassword(password).then(isValid => 
      !isValid ? res.send(401) : res.send())
      
      const payload = { 
       emil: user.email,
       password: user.password 
     };
     
    const token = generateToken(payload);
    res.cookie("token", token);
    res.send(payload);
  });
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

router.put("/update", validateAuth, (req, res) => {
  const {celNumber, adress, email, password, isAdmin} = req.body
  User.update({celNumber, adress, email, password, isAdmin}) 
  .then((changes) => res.send(changes))
  .catch(error => {
    console.error(error);
    res.status(500).send('Error al actualizar los datos del usuario');
  });
});


module.exports = router