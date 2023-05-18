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

module.exports = {
  searchOrder: async (req, res) => {
    try {
      const order = await Order.findOne({
        where: {
          id: req.params.orderId,
          userId: req.params.userId,
        },
      });
      const orderItem = await Orderitem.findAll({
        where: {
          orderId: order.id,
        },
      });
      res.status(200).send([order, orderItem]);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  searchOrders: async (req, res) => {
    try {
      const orders = await Order.findAll({
        where: {
          userId: req.params.userId,
        },
      });
      res.status(200).send(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error retrieving orders.");
    }
  },

  generatePurchase: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.userId);
      const order = await Order.create(req.body, {
        where: { userId: user.id },
        include: [{ model: User }],
      });
      await order.setUser(user);

      const cart = await Cart.findOne({
        where: {
          userId: req.params.userId,
        },
      });

      const cartItems = await Cartitem.findAll({
        where: {
          cartId: cart.id,
        },
      });

      await Promise.all(
        cartItems.map(async (item) => {
          await Orderitem.create(
            {
              productId: item.productId,
              cantidad: item.cantidad,
              orderId: order.id,
            },
            { include: [{ model: Order }] }
          );
          await Cartitem.destroy({
            where: {
              id: item.id,
            },
          });
        })
      );

      await transporter.sendMail({
        from: "tunecommerce@hotmail.com", // cambiar por  ${admin.email}
        to: `neilen.monlezun@gmail.com`, //cambiar por ${user.email}
        subject: "🎸Confirmacion de compra🎸",
        html: `<p><b>Has confirmado tu compra en TUNEcommerce</b></p>
                  <p>Muchas gracias por confiar en nosotros.</p>
                  <img src="https://cdn.discordapp.com/attachments/1057795547429347421/1083762813098541218/image.png"/>`,
      });
      res.sendStatus(201);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },

  updatePurchase: async (req, res) => {
    try {
      const { status } = req.body;
      const [, [updatedOrder]] = await Order.update(
        { status },
        {
          where: {
            id: req.params.orderId,
          },
          returning: true,
        }
      );
      const user = await User.findByPk(req.params.userId);

      await transporter.sendMail({
        from: "tunecommerce@hotmail.com", // cambiar por  ${admin.email}
        to: `matute_98ca@hotmail.com`, //cambiar por ${user.email}
        subject: "🎸Actualizacion estado de compra🎸",
        html: `<p><b>Tu compra se encuentra ${status}</b></p>
        <p>Muchas gracias por confiar en TUNEcommerce.</p>
        <img src="https://cdn.discordapp.com/attachments/1057795547429347421/1083762813098541218/image.png"/>`,
      });

      res.send(updatedOrder).status(200);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  },

};
