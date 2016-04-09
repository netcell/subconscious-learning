const dateFormat = require('dateformat');
const express = require('express');
const bodyParser = require('body-parser')
const low = require('lowdb')
const storage = require('lowdb/file-sync')
var db = low('result.json', { storage })((new Date().toString()));

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// respond with "hello world" when a GET request is made to the homepage
app.post('/', function(req, res) {
	var now = new Date();
	req.body.time = dateFormat(now, "hh:MM:ss");;
	console.log(JSON.stringify(req.body, null, 4));
	db.push(req.body);
	res.send(200);
});

app.listen(4000)