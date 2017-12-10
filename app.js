var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const cors = require('cors');

var index = require('./routes/index');
var users = require('./routes/users');
var PORT = 8000;

var app = express();
// CORS Middleware
app.use(cors());

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

var server = app.listen(PORT, function () {
	console.log('listening ' + PORT);
});

mongoose.connect('mongodb://localhost:27017/Weather', { useMongoClient: true }, function (err, db) {
	if (err) throw err;
	console.log("Database connected!");
});

var TemperatureAndHumiditySchema = new mongoose.Schema({
	temperature: Number,
	humidity: Number,
	year: Number,
	month: Number,
	day: Number,
	hour: Number,
	city: String,
	time: Date
});

var PositionSchema = new mongoose.Schema({
	longitude: Number,
	latitude: Number
});

var TemperatureAndHumidity = mongoose.model("TemperatureAndHumidity", TemperatureAndHumiditySchema);
var Position = mongoose.model("Position", PositionSchema);
exports.TemperatureAndHumidity = TemperatureAndHumidity;
exports.Position = Position;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

module.exports = app;
