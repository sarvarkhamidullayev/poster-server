const express = require("express");
const multer = require("../../multer");
const { ProductController } = require("./product.controller");
const productRoute = express.Router();

productRoute.get("/", ProductController.getAll);

productRoute.post("/", multer, ProductController.create);
productRoute.delete("/", ProductController.delete);
productRoute.put("/:id", ProductController.update);
module.exports = productRoute;
