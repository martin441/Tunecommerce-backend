const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const {
  Order,
  Orderitem,
  Notificacion,
  User,
  Cart,
  Cartitem,
} = require("../models");

let transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "tunecommerce@hotmail.com",
    pass: "TUNE12345678",
  },
});

//buscar una orden y sus elementos
router.get("/:userId/:orderId", (req, res) => {
  Order.findOne({
    where: {
      id: req.params.orderId,
      userId: req.params.userId,
    },
  }).then((order) => {
    Orderitem.findAll({
      where: {
        orderId: order.dataValues.id,
      },
    }).then((orderItem) => {
      res.status(200).send([order, orderItem]);
    });
  });
});

//buscar historial de ordenes de un usuario
router.get("/:userId", (req, res) => {
  Order.findAll({
    where: {
      userId: req.params.userId,
    },
  }).then((orders) => {
    res.status(200).send(orders);
  });
});

router.post("/:userId", (req, res) => {
  User.findByPk(req.params.userId)
    .then((user) => {
      Order.create(req.body, {
        where: { userId: user.id },
        include: [{ model: User }],
      }).then((order) => {
        order.setUser(user);
        Cart.findOne({
          where: {
            userId: req.params.userId,
          },
        }).then((cart) => {
          Cartitem.findAll({
            where: {
              cartId: cart.id,
            },
          })
            .then((cartItems) => {
              cartItems.map((item) => {
                Orderitem.create(
                  {
                    productId: item.productId,
                    cantidad: item.cantidad,
                    orderId: order.id,
                  },
                  { include: [{ model: Order }] }
                ).then(() => {
                  Cartitem.destroy({
                    where: {
                      id: item.id,
                    },
                  });
                });
              });
            })
            .then(() => {
              transporter.sendMail({
                from: "tunecommerce@hotmail.com", // cambiar por  ${admin.email}
                to: `matute_98ca@hotmail.com`, //cambiar por ${user.email}
                subject: "🎸Confirmacion de compra🎸",
                html: `<p><b>Has confirmado tu compra en TUNEcommerce</b></p>
                <p>Muchas gracias por confiar en nosotros.</p>
                <img src="https://cdn.discordapp.com/attachments/1057795547429347421/1083762813098541218/image.png"/>`,
              });
            });
        });
      });
    })
    .then(() => {
      res.sendStatus(201);
    });
});

router.put("/:userId/:orderId", (req, res, next) => {
  const { status } = req.body;
  Order.update(
    { status },
    {
      where: {
        id: req.params.orderId,
      },
      returning: true,
    }
  ).then((update) => {
    User.findByPk(req.params.userId).then((user) => {
      transporter
        .sendMail({
          from: "tunecommerce@hotmail.com>", // cambiar por  ${admin.email}
          to: `matute_98ca@hotmail.com`, //cambiar por ${user.email}
          subject: "🎸Actualizacion estado de compra🎸",
          html: `<p><b>Tu compra se encuentra ${status}</b></p>
          <p>Muchas gracias por confiar en TUNEcommerce.</p>
          <img src="https://cdn.discordapp.com/attachments/1057795547429347421/1083762813098541218/image.png"/>`,
        })
        .then(() => {
          res.send(update[1][0]).status(200);
        });
    });
  });
});

module.exports = router;
