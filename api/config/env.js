module.exports = {
  PORT: process.env.PORT || 3001,
  DB_NAME: process.env.DB_NAME || "tune",
  DB_USER: process.env.DB_USER || null,
  DB_PASSWORD: process.env.DB_PASSWORD || null,
  DB_HOST: process.env.DB_HOST || "localhost",
  ORIGIN: process.env.ORIGIN || "http://localhost:3000",
};
