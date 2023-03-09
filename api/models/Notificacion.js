const S = require("sequelize");
const db = require("../config/index");

class Notificacion extends S.Model {}

Notificacion.init(
  {
    date: { type: S.DATE },
    message: { type: S.TEXT },
  },
  { sequelize: db, modelName: "notificacion" }
);

module.exports = Notificacion;
