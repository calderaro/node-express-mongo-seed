"use strict";

let bcrypt = require('bcryptjs'),
  mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

let userSchema = Schema({
  username: { type: String, required: true, unique: true},
  name: { type: String, required: true},
  hash: { type: String, required: true},
  type: { type: String, required: true, enum: ["cliente","vendedor","supervisor","gerente","administrador"]},
  code: { type: String, required: true},
  creator: { type: ObjectId, ref: "users", required: true},
  created: { type: Date, required: true},
  updated: { type: Date, required: true},
});

userSchema.plugin(require("mongoose-deep-populate")(mongoose), {
  populate: {
    "creator": {
      select: "_id username name",
    },
    "access_map": {
      select: "name rules"
    }
  }
});


userSchema.statics.insert = function({username, userpass, name, creator, code, type}, cb){

  this.findOne({username}).select("_id").exec(function(err, user){
    if(err) return cb(err);
    if(user) return cb("Nombre de usuario en uso");
  
    bcrypt.hash(userpass, 10, function(err, hash) {
      if (err) return cb(err);
      userMdl.create({
        username,
        name,
        hash,
        name,
        code,
        type,
        creator,
        created: new Date(),
        updated: new Date(),
      }, cb);
    });
  });
}

userSchema.statics.insertAdmin = function({username, userpass, name, type, code}, cb){

  this.findOne({username}).select("_id").exec(function(err, user){
    if(err) return cb(err);
    if(user) return cb(null, user); // si admin existe no retorna error.
  
    bcrypt.hash(userpass, 10, function(err, hash) {
      if (err) return cb(err);
      userMdl.collection.insert({
        username,
        name,
        hash,
        type,
        code,
        created: new Date(),
        updated: new Date(),
      }, cb);
    });
  });
}


let userMdl = mongoose.model("users", userSchema);
module.exports = userMdl; 