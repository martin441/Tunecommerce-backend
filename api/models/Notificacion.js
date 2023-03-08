const S = require("sequelize");
const db = require("../config/index");

class Notificacion extends S.Model {}

Notificacion.init(
  {
    //userId: { type: S.INTEGER },
    //orderStatus: { type: S.STRING },
    date: { type: S.DATE },
    message: { type: S.TEXT },
  },
  { sequelize: db, modelName: "notificacion" }
);

module.exports = Notificacion;
