const Category = require("../models/Category");

module.exports= {

createCategory: async (req, res) => {
    try {
      const { name, description } = req.body;
      const category = await Category.create({ name, description });
      res.send(category);
    } catch (error) {
      res.send("error al crear la categoria");
    }
  },

  getCategories: async (req, res) => {
    try {
      const categories = await Category.findAll();
      res.send(categories);
    } catch (error) {
      console.error(error);
      res.send("Error al buscar las categorías");
    }
  },

  updateCategory: async (req, res) => {
    const { name, description } = req.body;
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).send("La categoría no existe");
      }
      await category.update({ name, description });
      res.status(200).send(category);
    } catch (error) {
      res.status(500).send("Error al actualizar la categoría");
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).send("No se ha encontrado categoría");
      }
      await category.destroy();
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.status(500).send("Ha ocurrido un error al eliminar la categoría");
    }
  }


}