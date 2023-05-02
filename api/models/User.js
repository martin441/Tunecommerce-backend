const S = require("sequelize");
const db = require("../config/index");
const bcrypt = require("bcryptjs");

class User extends S.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (hash) => hash === this.password
    );
  }

  static findByEmail(email) {
    return User.findOne({ where: { email } });
  }

  static findByUsername(username) {
    return User.findOne({ where: { username } });
  }
}

User.init(
  {
    username: {
      type: S.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: S.STRING,
      allowNull: false,
    },
    lastname: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      isEmail: true,
      unique: true,
    },
    address: {
      type: S.STRING,
      allowNull: false,
    },
    celnumber: {
      type: S.STRING,
      allowNull: false,
    },
    password: {
      type: S.STRING,
      allowNull: false,
      validate: {
        len: [8, 32],
      },
    },
    salt: {
      type: S.STRING,
    },
    isAdmin: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize: db, modelName: "user", timestamps: false }
);

User.addHook("beforeCreate", (user) => {
  const salt = bcrypt.genSaltSync(9);
  user.salt = salt;
  return user.hash(user.password, user.salt).then((hash) => {
    user.password = hash;
  });
});
User.beforeUpdate((user) => {
  const salt = bcrypt.genSaltSync(9);
  user.salt = salt;
  return user.hash(user.password, user.salt).then((hash) => {
    user.password = hash;
  });
});
module.exports = User;
