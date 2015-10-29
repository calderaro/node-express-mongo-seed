"use strict";

let mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let userSchema = Schema({
  username: { type: String, required: true, unique: true},
  name: { type: String, required: true},
  created: { type: Date }
});

let userMdl = mongoose.model("users", userSchema);
module.exports = userMdl; 