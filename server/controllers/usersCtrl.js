"use strict";

//exports.list = function(req,res){
//
//	var page = req.params.page || 0;
//	if(!v.isNumeric(page)) return res.status(400).json("No es un numero");
//
//	var skip = 15 * page;
//	userMdl.find({}).skip(skip).limit(15)
//	.select("username name user ci dept").deepPopulate(["user","dept"]).exec(function(err, users){
//		if (err) return res.status(500).json(err);
//		if (!users.length) return res.status(404).json("No se encontraron Usuarios");
//		res.json(users);
//	})
//}
//exports.show = function(req,res){
//
//	var id = req.params.id;
//	if(!v.isAlphanumeric(id) || !v.isLength(id, 24, 24)) return res.status(400).json("No es un ID");
//
//	userMdl
//	.findOne({_id: req.params.id})
//	.select("username name user ci dept")
//	.deepPopulate(["user","dept"])
//	.exec(function(err, user) {
//		if (err) return res.status(500).json(err);
//		if (!user) return res.status(404).json("ID no existe");
//		res.json(user);
//	});
//}
//req.models.users.find({}, (err, users) => res.status(200).json(users));
exports.create = function(req,res){

  let {body, username, userpass, name,	creator } = req.body; 

  req.models.users.insert({
    username,
    userpass,
    name,
    creator
  },function(err, user) {
    if (err) return res.status(500).json(err);
    res.json(user);
  });
}
//
//exports.search = function(req,res){
//	let by = req.params.by;
//	let data = req.params.data;
//	let page = req.params.page || 0;
//	let skip = 15 * page;
//	if(!v.isNumeric(page)) return res.status(400).json("No es un numero");
//
//	if(!v.isAlpha(by)) return res.status(400).json("Criterio invalido");
//	if(!v.isLength(by, 4 ,10)) return res.status(400).json("Criterio invalido");
//
//  	if(!v.isLength(data, 1 ,30)) return res.status(400).json("Dato invalido");
//
//	if(by === "name"){
//		userMdl.find({name: new RegExp(data, "gi")}).sort({created: -1}).skip(skip).limit(15)
//		.select("username name user ci dept").deepPopulate(["user","dept"]).exec(function(err, users){
//			if (err) return res.status(500).json(err);
//			if (!users.length) return res.status(404).json("No hay coincidencias");
//			return res.json(users);
//		});
//	}else if(by === "username"){
//		userMdl.find({username: new RegExp(data, "gi")}).sort({created: -1}).skip(skip).limit(15)
//		.select("username name user ci dept").deepPopulate(["user"]).exec(function(err, users){
//			if (err) return res.status(500).json(err);
//			if (!users.length) return res.status(404).json("No hay coincidencias");
//			return res.json(users);
//		});
//	}else if(by === "creator"){
//		userMdl.find({ name: new RegExp(data, "gi")}).exec( (err, users) => {
//			if (err) return res.status(500).json(err);
//			userMdl.find().where('user').in(users).sort({created: -1}).skip(skip).limit(15)
//			.select("username name user ci dept").deepPopulate(["user","dept"])
//			.exec((err, users) => {
//				if (err) return res.status(500).json(err);
//				if (!users.length) return res.status(404).json("No hay coincidencias");
//				res.json(users);
//			});
//		});
//	}else if(by === "dept"){
//		deptMdl.find({ name: new RegExp(data, "gi")}).exec( (err, depts) => {
//			if (err) return res.status(500).json(err);
//			userMdl.find().where('dept').in(depts).sort({created: -1}).skip(skip).limit(15)
//			.select("username name user ci dept").deepPopulate(["user","dept"])
//			.exec((err, users) => {
//				if (err) return res.status(500).json(err);
//				if (!users.length) return res.status(404).json("No hay coincidencias");
//				res.json(users);
//			});
//		});
//	}else{
//		return res.status(400).json("Criterio invalido");
//	}
//}
//
//exports.delete = function(req,res){
//	res.send("deleting")
//}
//exports.edit = function(req,res){
//	res.send("editing")
//}