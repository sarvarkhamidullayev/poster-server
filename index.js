// const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const app = express();



// connect mongodb
require('./db')

// use middlewares
require('./middlewares').useMiddlewares(express, app)

// //import routes
const categoryRoute = require("./src/category/category.route");
const productRoute = require("./src/product/product.route");

// //use routes
app.use("/category", categoryRoute);
app.use("/product", productRoute);

// // start the web server on port 3000
app.listen(3000, () => {
  console.log("Web server listening on port 3000");
});
