const Sequelize = require("sequelize");
const config = require("./env");

const DB_HOST = config.DB_HOST;
const DB_USER = config.DB_USER;
const DB_PASSWORD = config.DB_PASSWORD;
const DB_NAME = config.DB_NAME;

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false,
});
module.exports = db;
