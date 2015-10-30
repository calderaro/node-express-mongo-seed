

exports.login = function(req,res){

  var username = req.body.username;
  var userpass = req.body.userpass;
  
  userMdl.findOne({username: username}).lean().exec(function(err, user){
    if (err) return res.json(err);
    if(!user) return res.json("Usuario no existe");
    var salt = user.salt
    crypto.pbkdf2(userpass, salt, 4096, 512, 'sha256', function(err, hash) {
        if (err) return res.json(err);
        if((hash).toString() !== user.hash) return res.json("Usuario no existe");
        var token = jwt.sign({ username: user.username, _id: user._id }, 'shhhhh');
        return res.json({token: token })
    });
  });
  
}

exports.authorize = function(req, res, next){
  var token = req.get("token");
  jwt.verify(token, 'shhhhh', function(err, decoded) {
    if(err) return res.status(401).json({ error: 'unauthorized' });
      userMdl.findOne({_id: decoded._id}).select("username").exec(function(err, user){
        if(err) return res.status(400).json({ error: err });
        if(!user) return res.status(401).json({ error: 'unauthorized' });
        req.token = decoded;
        return next();
      });
      
  });
}