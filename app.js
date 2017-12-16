var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});

// MYSQL

var mysql = require('mysql');

var con = mysql.createConnection({
  	host: '127.0.0.1',
	port: '3306',
	user: 'root',
	password: 'root',
	database: 'users'
});

// FIM MYSQL
// Correto
app.get("/api/usuarios", function(req, res) {
	con.query("SELECT * FROM customers", function (err, result, fields) {
	if (err) throw err;
	console.log(result);
	return res.send( result );
	});
});

// Correto
app.get("/api/usuarios/:id", function(req, res) {
	con.query("SELECT * FROM customers WHERE `id` = " + req.params.id, function (err, result, fields) {
	if (err) throw err;
	if ( result.affectedRows === 0 ) {
		return res.send( { "error": "not found" } );
	} else {
		return res.send( result );
	}
	});
});

// Correto
app.delete("/account/:id", function(req, res) {
	con.query("DELETE FROM customers WHERE `id` = " + req.params.id, function (err, result, fields) {
	if (err) throw err;
	if ( result.affectedRows === 0 ) {
		return res.send( { "error": "not found" } );
	} else {
		return res.send( result );
	}
	});
});

// Correto
app.post("/account/", function(req, res) {
	var nome = req.query.nome;
	var sql = ("INSERT INTO customers (nome) VALUES ('" + nome + "')");
	con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("1 record inserted");
	return res.send( result );
	});
});


app.put("/account/", function(req, res) {
	console.log( 'pingando' );
	var set = req.query.set;
	var setValue = req.query.setValue;
	var where = req.query.where;
	var whereParam = req.query.whereParam;

	console.log( 'working' );

	var sql = ("UPDATE customers SET " + set + " = '" + setValue + "' WHERE " + where + " = '" + whereParam + "'");
	console.log( sql );

	con.query(sql, function (err, result) {
	if (err) throw err;
	console.log(result.affectedRows + " record(s) updated");
	return res.send( result );
	});


});


