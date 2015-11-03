"use strict";
let http = require("http"),
  path = require("path"),
  async = require("async"),
  express = require("express"),
  logger = require("morgan"),
  mongoose = require("mongoose"),
  models = require("./models/"),
  chalk = require("chalk"),
  bodyParser = require("body-parser"),
  app = express(),
  server = http.createServer(app),
  config = require("./config");

app.set("views", path.join(__dirname,"./views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));
app.use((req, res, next) => {
  req.models = mongoose.models;
  return next();
});
app.use(require("./routes"));

// Create the database connection
mongoose.connect(config.DB_URI, function(err){

  if (err) return console.log(chalk.red(err));

  // listen for connection throws an error
  mongoose.connection.on("error", (err) => { console.log(chalk.red("Mongoose default connection error: " + err)); });

  // listen for connection is disconnected
  mongoose.connection.on("disconnected", () => { console.log(chalk.red("Mongoose default connection disconnected")); });

  // log the connection
  console.log(chalk.green("Mongoose connection open to " + config.DB_URI));

   // if not errors open the http server
  server.listen(config.HTTP_PORT ,(err) => {
    if(err) console.log(chalk.red(err));
    else console.log(chalk.green("http server listening port " + config.HTTP_PORT));
  });
});
