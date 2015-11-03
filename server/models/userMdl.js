"use strict";

let crypto = require("crypto"),
  mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

let userSchema = Schema({
  username: { type: String, required: true, unique: true},
  name: { type: String, required: true},
  hash: { type: String, required: true},
  salt: { type: String, required: true},
  access_map: { type: ObjectId, ref: "accessmaps", required: true},
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


userSchema.statics.insert = function({username, userpass, name, access_map, creator}, cb){

  mongoose.models.accessmaps.findOne({name: access_map}).select("_id").exec((err, map) => {
    if(err) return cb(err);
    if(!map) return cb("mapa de acceso no existe");

    this.findOne({username}).select("_id").exec(function(err, user){
      if(err) return cb(err);
      if(user) return cb("Nombre de usuario en uso");
    
    	let salt = crypto.randomBytes(20).toString("base64");
    	crypto.pbkdf2( userpass, salt, 4096, 512, "sha256", function(err, hash) {
    	  if (err) return cb(err);
    		userMdl.create({
    		  username,
    		  name,
    		  salt,
    		  hash,
          name,
          access_map: map._id,
    		  creator,
          created: new Date(),
          updated: new Date(),
    		}, cb);
    	});
    });
  });
}

userSchema.statics.insertAdmin = function({username, userpass, name, access_map}, cb){

  mongoose.models.accessmaps.findOne({name: access_map}).select("_id").exec((err, map) => {
    if(err) return cb(err);
    if(!map) return cb("mapa de acceso no existe");

    this.findOne({username}).select("_id").exec(function(err, user){
      if(err) return cb(err);
      if(user) return cb(null, user); // si admin existe no retorna error.
    
      let salt = crypto.randomBytes(20).toString("base64");
      crypto.pbkdf2( userpass, salt, 4096, 512, "sha256", function(err, hash) {
        if (err) return cb(err);
        userMdl.collection.insert({
          username,
          name,
          salt,
          hash,
          name,
          access_map: map._id,
          created: new Date(),
          updated: new Date(),
        }, cb);
      });
    });
  });
}


let userMdl = mongoose.model("users", userSchema);
module.exports = userMdl; 