
const router= require('express').Router()
const usersRouter= require('./users')
const productsRouter = require("./products")

router.use("/user", user);

router.use('/users', usersRouter)
router.use('/products', productsRouter)


module.exports= router

