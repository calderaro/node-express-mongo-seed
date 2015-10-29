"use strict";
let fs = require("fs"),
  path = require("path"),
  files = fs.readdirSync(__dirname);

files.forEach(function(file) {
  let fileName = path.basename(file, ".js");
  if (fileName !== "index") {
    exports[fileName] = require("./" + fileName);
  }
});
