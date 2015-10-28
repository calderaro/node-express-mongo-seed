var mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit : 10,
	host     : '201.249.61.202',
	port     : '3306',
	user     : 'visor',
	password : '123456',
	database: "datummadidonpeca"
});

exports.connection = function(req, res, next){
	
	  	req.pool = pool;
	  	return next();
};
