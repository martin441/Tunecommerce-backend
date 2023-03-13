const express = require("express");
const { User } = require("../models");
const router = express.Router();
const Products = require("../models/Product");

router.get("/", (req, res) => {
  Products.findAll().then((products) => res.json(products));
});

router.get("/:productId", (req, res) => {
  Products.findOne({ where: { id: req.params.productId } }).then((product) =>
    res.json(product)
  );
});

router.post("/:userId", (req, res) => {
  const { name, description, price, image, stock } = req.body;

  User.findByPk(req.params.userId).then((user) => {
    Products.create(
      { name, description, price, image, stock, userId: user.id },
      { include: [{ model: User }] }
    ).then((product) => res.send(product));
  });
});

router.delete("/:productId", (req, res) => {
  Products.destroy({
    where: {
      id: req.params.productId,
    },
  }).then(() => {
    res.sendStatus(204);
  });
});

router.put("/:productId", (req, res) => {
  const { name, description, price, image, stock } = req.body;

  Products.update(
    { name, description, price, image, stock },
    {
      where: { id: req.params.productId },
      returning: true,
    }
  ).then((product) => res.send(product[1][0]));
});

module.exports = router;
