const express = require("express");
const router = express.Router();
const { Cart, Cartitem, User, Product } = require("../models");

router.get("/:userId", (req, res) => {
  Cart.findOne({
    where: {
      userId: req.params.userId,
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
  User.findByPk(req.params.userId)
    .then((user) => {
      Cart.findOrCreate({
        where: { userId: user.id },
        include: [{ model: User }],
      }).then((cart) => {
        Cartitem.create(
          { cantidad },
          {
            // ber cuando usar el include de modelos
            include: [{ model: Cart }],
          }
        ).then((cartitem) => {
          cartitem.setCart(cart[0]);
          Product.findByPk(req.params.productId).then((product) => {
            cartitem.setProduct(product);
          });
        });
      });
    })
    .then(() => {
      res.sendStatus(204);
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

router.delete("/:userId", (req, res, next) => {
  Cart.findOne({
    where: {
      userId: req.params.userId,
    },
  })
    .then((cart) => {
      Cartitem.destroy({
        where: {
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
      Cartitem.update(
        { cantidad },
        {
          where: {
            productId: req.params.productId,
            cartId: cart.id,
          },
          returning: true,
        }
      ).then((updated) => {
        const cartItem = updated[1][0];
        res.status(201).send(cartItem);
      });
    })
    .catch(next);
});

module.exports = router;
