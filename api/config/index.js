const Sequelize = require("sequelize");
require("dotenv").config();

const DB_URL = process.env.DB_URL;

const db = new Sequelize(DB_URL, {
  dialectModule: require("pg"),
  logging: false,
});

module.exports = db;
