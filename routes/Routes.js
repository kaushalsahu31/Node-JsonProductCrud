const router = require("express").Router();
const fs = require('fs');
const ProductRoutes = require('./product')

router.use("/product", ProductRoutes) 

module.exports = router;
