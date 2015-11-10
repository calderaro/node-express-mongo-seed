"use strict";
let http = require("http"),
  path = require("path"),
  async = require("async"),
  express = require("express"),
  mongoose = require("mongoose"),
  models = require("./models/"),
  chalk = require("chalk"),
  bodyParser = require("body-parser"),
  app = express(),
  server = http.createServer(app),
  config = require("./config"),
  morgan = require('morgan'),
  mysql = require('mysql');


app.set("views", path.join(__dirname,"./views"));
app.set("view engine", "jade");
app.use( morgan("dev"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));
app.use((req, res, next) => {
  req.models = mongoose.models;
  return next();
});



async.series([
  function(cb){
    return cb(null)
    mysql.createPool(config.MYSQL).getConnection(function(err, connection) {
      if(err) return cb(err);
      app.use((req, res, next) => {
        req.con = connection;
        return next();
      });
      return cb(null, "mysql connected");
    });
  },
  function(cb){
    mongoose.connect(config.MONGO.DB_URI, (err) =>{
      if(err) return cb(err);
      // listen for connection throws an error
      mongoose.connection.on("error", (err) => { console.log(chalk.red("Mongoose default connection error: " + err)); });

      // listen for connection is disconnected
      mongoose.connection.on("disconnected", () => { console.log(chalk.red("Mongoose default connection disconnected")); });

      // log the connection
      return cb(null, "Mongoose connection open to " + config.DB_URI);
    });
  },
  function(cb){
    mongoose.models.users.insertAdmin({
      username: "admin",
      userpass: "clave123",
      name: "administrador",
      type: "administrador"
    }, (err, user) =>{
      if(err) return cb(err);
      return cb(null, "administrador creado");
    });
  },
  function(cb){
    // if not errors open the http server
    app.use(require("./routes"));
    server.listen(config.HTTP_PORT ,(err) => {
      if(err) return cb(err);
      return cb(null, "http server listening port " + config.HTTP_PORT);
    });
  }
], (err, res) =>{
  if(err) console.log(chalk.red(err));
  else console.log(res);
})