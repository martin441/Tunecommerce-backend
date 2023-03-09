const express = require("express")
const router = express.Router();
const Products = require("../models/Product")



router.get("/", (req,res) => {
 Products.findAll().then(products => res.json(products))
})

router.get("/:id", (req,res) => {
    Products.findOne({ where: { id: req.params.id } })
    .then(product => res.json(product))
})


module.exports = router