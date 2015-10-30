"use strict";

exports.list = function(req, res){
  req.models.accessmaps.find({}, (err, maps) => {
    if(err) return res.status(400).json(err);
    return res.status(200).json(maps);
  });
}

exports.create = function(req, res){
  req.models.accessmaps.insert(req.body, (err, maps) => {
  	if(err) return res.status(400).json(err);
  	return res.status(200).json(maps);
  })
}