const express = require("express");
const router = express.Router();
const { Cart, Cartitem, User, Product } = require("../models");

router.get("/:userId", (req, res) => {
  Cart.findOne({
    where: {
      userId: req.params.id,
    },
  }).then((cart) => {
    Cartitem.findAll({
      where: {
        cartId: cart.id,
      },
    }).then((cartItems) => {
      res.send(cartItems);
    });
  });
});

router.post("/:userId/:productId", (req, res) => {
  const { cantidad } = req.body;
  User.findByPk(req.params.userId).then((user) => {
    Cart.findOrCreate({
      where: { userId: user.id },
    }).then((cart) => {
      cart.setUser(user);
      Cartitem.create({ cantidad }).then((cartitem) => {
        cartitem.setCart(cart);
        Product.findByPk(req.params.productId).then((product) => {
          cartitem.setProduct(product);
        });
      });
    });
  });
});

router.delete("/:userId/:productId", (req, res, next) => {
  Cart.findOne({
    where: {
      userId: req.params.userId,
    },
  })
    .then((cart) => {
      Cartitem.destroy({
        where: {
          productId: req.params.productId,
          cartId: cart.id,
        },
      });
    })
    .then(() => res.sendStatus(202))
    .catch(next);
});

router.put("/:userId/:productId", (req, res, next) => {
  const { cantidad } = req.body;
  Cart.findOne({
    where: {
      userId: req.params.userId,
    },
  })
    .then((cart) => {
      Cartitem.update(cantidad, {
        where: {
          productId: req.params.productId,
          cartId: cart.id,
        },
        returning: true,
      }).then(([affectedRows, updated]) => {
        const cartItem = updated[0];
        res.status(201).send(cartItem);
      });
    })
    .catch(next);
});

module.exports = router;
