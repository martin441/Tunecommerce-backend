const express = require("express");
const router = express.Router();
const Products = require("../models/Product");
const Category = require("../models/Category");

// Creat categorias
router.post("/", (req, res) => {
  const { name, description } = req.body;

  Category.create({ name, description })
    .then((category) => res.send(category))
    .catch(() => res.send("error al crear la categoria"));
});

// Obtener todas las categorias
router.get("/todo", (req, res) => {
  Category.findAll().then((categories) => res.send(categories));
});

// Editar categorias
router.put("/:id", (req, res) => {
  const { name, description } = req.body;

  Category.findByPk(req.params.id)
    .then((category) => category.update({ name, description }))
    .then((changes) => res.status(200).send(changes));
});

// Eliminar una categoria
router.delete("/:id", (req, res) => {
  Category.findByPk(req.params.id)
    .then((category) => category.destroy())
    .then(() => res.send("categoria eliminada con exito"));
});



module.exports = router;
