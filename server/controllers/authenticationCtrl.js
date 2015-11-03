"use strict";
let crypto = require("crypto"),
  jwt = require("jsonwebtoken");

exports.login = function(req,res){

  let {username, userpass} = req.body;
  
  req.models.users.findOne({username: username}).lean().exec(function(err, user){
    if(err) return res.json(err);
    if(!user) return res.status(400).json("Usuario no existe");
    let salt = user.salt
    crypto.pbkdf2(userpass, salt, 4096, 512, 'sha256', function(err, hash) {
        if (err) return res.json(err);
        if((hash).toString() !== user.hash) return res.json("Usuario no existe");
        let token = jwt.sign({ username: user.username, _id: user._id }, 'shhhhh');
        return res.status(200).json(token)
    });
  });
}

exports.authorize = function(req, res, next){
  let token = req.get("token");
  jwt.verify(token, 'shhhhh', function(err, decoded) {
    if(err) return res.status(401).json({ error: 'unauthorized' });
      req.models.users.findOne({_id: decoded._id}).select("username").exec(function(err, user){
        if(err) return res.status(400).json({ error: err });
        if(!user) return res.status(401).json({ error: 'unauthorized' });
        req.token = decoded;
        return next();
      });
  });
}