const { Cart, Cartitem, User, Product } = require("../models");

module.exports = {
    findCart: async (req, res) => {
        try {
          const cart = await Cart.findOne({
            where: {
              userId: req.params.userId,
            },
          });
          if (!cart) {
            return res.status(404).send("El carrito no existe");
          }
          const cartItems = await Cartitem.findAll({
            where: {
              cartId: cart.id,
            },
          });
          res.send(cartItems);
        } catch (error) {
          res.status(500).send("Hubo un error al buscar los elementos del carrito");
        }
      }, 

      findOrCreateCart: async (req, res) => {
        const { cantidad } = req.body;
      
        try {
          const user = await User.findByPk(req.params.userId);
      
          const [cart, created] = await Cart.findOrCreate({
            where: { userId: user.id },
            include: [{ model: User }],
          });
      
          const cartitem = await Cartitem.create(
            { cantidad },
            {
              include: [{ model: Cart }],
            }
          );
      
          await cartitem.setCart(cart);
      
          const product = await Product.findByPk(req.params.productId);
      
          await cartitem.setProduct(product);
      
          res.sendStatus(204);
      
        } catch (error) {
          res.status(500).send("Hubo un error al agregar el producto al carrito");
        }
      },

      deleteOneProduct:  async (req, res, next) => {
        try {
          const cart = await Cart.findOne({
            where: {
              userId: req.params.userId,
            },
          });
      
          await Cartitem.destroy({
            where: {
              productId: req.params.productId,
              cartId: cart.id,
            },
          });
      
          res.sendStatus(202);
      
        } catch (error) {
          next(error);
        }
      },

      deleteAllProducts: async (req, res, next) => {
        try {
          const cart = await Cart.findOne({
            where: {
              userId: req.params.userId,
            },
          });
          await Cartitem.destroy({
            where: {
              cartId: cart.id,
            },
          });
          res.sendStatus(202);
        } catch (error) {
          next(error);
        }
      },

      updateCart: async (req, res, next) => {
        try {
          const { cantidad } = req.body;
          const cart = await Cart.findOne({
            where: {
              userId: req.params.userId,
            },
          });
          const updated = await Cartitem.update(
            { cantidad },
            {
              where: {
                productId: req.params.productId,
                cartId: cart.id,
              },
              returning: true,
            }
          );
          const cartItem = updated[1][0];
          res.status(201).send(cartItem);
        } catch (error) {
          next(error);
        }
      }
}