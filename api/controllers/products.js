const { Op } = require("sequelize");
const { User } = require("../models");
const Products = require("../models/Product");
const Category = require("../models/Category");

module.exports= {

    findAllProducts: async (req, res) => {
        try {
          const products = await Products.findAll();
          res.json(products);
        } catch (error) {
          console.error(error);
          res.status(500).send("Error en el servidor");
        }
      },

      findOneProduct: async (req, res) => {
        try {
          const product = await Products.findOne({ where: { id: req.params.productId } });
          res.json(product);
        } catch (error) {
          console.error(error);
          res.status(500).send("Internal server error");
        }
      },
      
      searchProduct:async (req, res) => {
        try {
          const productName = req.params.productName.toLowerCase();
          const products = await Products.findAll({
            where: {
              name: {
                [Op.iLike]: `%${productName}%`,
              },
            },
          });
      
          if (!products[0]) {
            res.send("Not found");
          } else {
            res.send(products);
          }
        } catch (error) {
          console.error(error);
          res.status(500).send("Internal server error");
        }
      },

      createProduct: async (req, res) => {
        try {
          const { name, description, price, image, stock, category } = req.body;
      
          const user = await User.findByPk(req.params.userId);
          const categoryObj = await Category.findOne({ where: { id: category } });
          const product = await Products.create(
            {
              name,
              description,
              price,
              image,
              stock,
              userId: user.id,
              categoryId: categoryObj.id,
            },
            { include: [{ model: User }, { model: Category }] }
          );
          res.send(product);
        } catch (error) {
          console.error(error);
          res.status(500).send("Server Error");
        }
      },

      searchByCategory: async (req, res) => {
        try {
          const category = req.params.categoryId;
          const products = await Products.findAll({ where: { categoryId: category } });
          !products[0] ? res.send("Not found") : res.send(products);
        } catch (error) {
          console.error(error);
          res.status(500).send("Internal server error");
        }
      },
      deleteProducts: async (req, res) => {
        try {
          await Products.destroy({
            where: {
              id: req.params.productId,
            },
          });
          res.sendStatus(204);
        } catch (error) {
          console.log(error);
          res.sendStatus(500);
        }
      },

      updateProduct: async (req, res) => {
        const { name, description, price, image, stock } = req.body;
      
        try {
          const product = await Products.update(
            { name, description, price, image, stock },
            {
              where: { id: req.params.productId },
              returning: true,
            }
          );
          res.send(product[1][0]);
        } catch (err) {
          console.error(err);
          res.sendStatus(500);
        }
      },

      findProducts: async (req, res) => {
        const productName = req.params.productName;
      
        try {
          const products = await Products.findAll({
            where: {
              name: {
                [Op.iLike]: `%${productName}%`,
              },
            },
          });
          res.send(products);
        } catch (error) {
          res.send("No se han encontrado resultados");
        }
      }

}