"use strict";

exports.list = function(req,res){

  let page = req.params.page || 0;
  let skip = 15 * page;

  req.models.users.find({}).deepPopulate(["creator"]).exec(function(err, users){
    if (err) return res.status(500).json(err);
    if (!users.length) return res.status(404).json("No se encontraron Usuarios");
    res.status(200).json(users);
  });
}
 
exports.create = function(req,res){

  req.models.users.insert(req.body ,function(err, user) {
    if (err) return res.status(500).json(err);
    res.json(user);
  });

}
