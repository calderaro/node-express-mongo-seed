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



async.series([
  function(cb){
    mongoose.connect(config.DB_URI, (err) =>{
      if(err) return cb(err);
      // listen for connection throws an error
      mongoose.connection.on("error", (err) => { console.log(chalk.red("Mongoose default connection error: " + err)); });

      // listen for connection is disconnected
      mongoose.connection.on("disconnected", () => { console.log(chalk.red("Mongoose default connection disconnected")); });

      // log the connection
      return cb(null, "Mongoose connection open to " + config.DB_URI);
    })
  },
  function(cb){
    mongoose.models.accessmaps.findOne({name: "administrador"}).exec((err, map) => {
      if(err) return cb(err);
      if(map) return cb();
      mongoose.models.accessmaps.collection.insert({
        name: "administrador",
        rules: [],
        created: new Date(),
        updated: new Date(),
      }, (err, map) =>{
        if(err) return cb(err);
        return cb(null, "mapa de acceso creado");
      });
    })
  }, function(cb){
    mongoose.models.users.insertAdmin({
      username: "admin",
      userpass: "clave123",
      name: "administrador",
      access_map: "administrador",
    }, (err, user) =>{
      if(err) return cb(err);
      return cb(null, "administrador creado");
    });
  }, function(cb){
    // if not errors open the http server
    server.listen(config.HTTP_PORT ,(err) => {
      if(err) return cb(err);
      return cb(null, "http server listening port " + config.HTTP_PORT);
    });
  }
], (err, res) =>{
  if(err) console.log(err);
  else console.log(res);
})