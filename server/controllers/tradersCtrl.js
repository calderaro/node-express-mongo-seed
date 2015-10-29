"use strict";

exports.list = function(req,res){
  req.models.users.find({}, (err, users) => res.status(200).json(users));
};

exports.create = function(req, res){ res.status(200).send(123); };
exports.edit = function(req, res){ res.status(200).send(123); };
exports.delete = function(req, res){ res.status(200).send(123); };
