module.exports = {
  DB_URL:
    process.env.DB_URL ||
    "postgres://default:1ftVcgnSli4k@ep-late-block-676649-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
  PORT: process.env.PORT || 3001,
  DB_NAME: process.env.DB_NAME || "tune",
  DB_USER: process.env.DB_USER || "default",
  DB_PASSWORD: process.env.DB_PASSWORD || "1ftVcgnSli4k",
  DB_HOST: process.env.DB_HOST || "localhost",
  ORIGIN: process.env.ORIGIN || "http://localhost:3000",
};
