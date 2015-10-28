"use strict";

exports.list = function(req,res){
	req.models.users.find({}, (err, users) => res.status(200).json(users));
}

exports.create = function(req, res){

}
exports.edit = function(req, res){}
exports.delete = function(req, res){}
