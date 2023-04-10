// const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const sendPost = require("./bot");
const app = express();
require('dotenv').config()



// connect mongodb
require('./db')
require('./bot')

// use middlewares
require('./middlewares').useMiddlewares(express, app)

// use routes
require('./routes').useRoutes(app)

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dist/spa/index.html");
});
// // start the web server on port 3000
app.listen(5000, () => {
  console.log("Web server listening on port 5000");
});
