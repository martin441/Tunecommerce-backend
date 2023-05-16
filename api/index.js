const express = require("express");
const app = express();
const db = require("./config");
const models = require("./models/index");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const fakedata = require("./fakedata");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 3001;
const ORIGIN = process.env.ORIGIN || "http://localhost:3000";

app.use(
  cors({
    credentials: true,
    origin: ORIGIN,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

db.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Servidor escuchando en el puerto 3001"));
});
