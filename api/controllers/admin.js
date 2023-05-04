const User = require("../models/User");
const validateAuth = require("../middlewares/auth");

module.exports = {
  promoteAdmin: async (req, res) => {
    try {
      /* if (!req.user.isAdmin) {
        return res
          .status(403)
          .send("No tienes permiso para realizar esta acción");
      } */
      await User.update(
        { isAdmin: req.body.isAdmin },
        { where: { id: req.params.userId } }
      );
      res.send("El usuario se actualizó correctamente!");
    } catch (error) {
      res.status(500).send("Hubo un error al actualizar el usuario");
    }
  },

  getAllUsers: async (req, res) => {
    try {
      /* if (!req.user) {
        return res
          .status(401)
          .send("Debe iniciar sesión para realizar esta acción");
      } */
      const usuarios = await User.findAll();
      res.send(usuarios);
    } catch (error) {
      res.status(500).send("Hubo un error al buscar los usuarios");
    }
  },

  deleteUsers: async (req, res) => {
    try {
     /*  if (!req.user.isAdmin) {
        return res
          .status(403)
          .send("No tienes permiso para realizar esta acción");
      } */
      const user = await User.findByPk(req.params.userId);
      if (!user) {
        return res.status(404).send("El usuario no existe");
      }
      await user.destroy();
      res.sendStatus(204);
    } catch (error) {
      res.status(500).send("Hubo un error al eliminar el usuario");
    }
  },
};
