const { generateToken, validateToken } = require("../config/token");
const validateAuth = require("../middlewares/auth");
const {} = require("../controllers/users")
const User = require("../models/User");


module.exports = {

register: async (req, res) => {
    try {
      console.log("REQBODY,", req.body)
      const user = await User.create(req.body);
      res.status(201).send(user);
      console.log(user, "USER")
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.sendStatus(401);
      const isValid = await user.validatePassword(password);
      if (!isValid) return res.sendStatus(401);
      const payload = {
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
      };
      const token = generateToken(payload);
      res.cookie("token", token).send(user);
    } catch (error) {
      next(error);
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("token");
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  },

  updateUser:  async (req, res) => {
    try {
      /* if (!req.user) {
        return res
          .status(401)
          .send("Debe iniciar sesión para realizar esta acción");
      } */

      const { celNumber, address, email, password, isAdmin } = req.body;

      const [_, [updatedUser]] = await User.update(
        { celNumber, address, email, password, isAdmin },
        { where: { id: req.params.id }, returning: true, individualHooks: true }
      );
      res.send(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(401).send("Error al actualizar los datos del usuario");
    }
  },

  userData: async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id);
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al obtener los datos del usuario");
    }
  }

}
