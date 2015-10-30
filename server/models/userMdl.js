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
  creator: { type: ObjectId, ref: "user"},
  created: { type: Date },
  updated: { type: Date },
});
userSchema.statics.insert = function(user, cb){

  let {username, userpass, name, creator} = user;

  this.findOne({username}).select("_id").exec(function(err, user){
    if(err) return cb(err);
    if(user) return cb("Nombre de usuario en uso");
  
  	let salt = crypto.randomBytes(20).toString('base64');
  	crypto.pbkdf2(userpass, salt, 4096, 512, 'sha256', function(err, hash) {
  	  	if (err) return cb(err);
  		userMdl.create({
  		  username,
  		  name,
  		  salt,
  		  hash,
          name,
  		  creator,
          created: new Date(),
          updated: new Date(),
  		}, cb)
  	});
  });
}

let userMdl = mongoose.model("users", userSchema);
module.exports = userMdl; 