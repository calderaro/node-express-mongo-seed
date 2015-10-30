"use strict";

let mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

let mapSchema = Schema({
  name: { type: String, required: true, unique: true},
  rules: [{ type: String}],
  creator: { type: ObjectId, ref: "user"},
  created: { type: Date },
  updated: { type: Date },
});

mapSchema.plugin(require('mongoose-deep-populate')(mongoose), {
  whitelist: [
    'creator'
  ]
});

mapSchema.statics.insert = function({name, rules, creator}, cb){
  mapMdl.create({
    name,
    rules,
    creator,
    created: new Date(),
    updated: new Date()
  },cb);
}

var mapMdl = mongoose.model("accessmaps", mapSchema);