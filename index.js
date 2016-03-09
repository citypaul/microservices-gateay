var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Client = require('node-rest-client').Client;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/json', function(req, res) {

    var client = new Client();
    var args = {
        data: req.body,
        headers: { "Content-Type": "application/json" }
    };

    client.post("http://localhost:3001/json", args, function (data, response) {
        res.status(200).json(data);
    });
});

app.get('/tennis-events', function(req, res) {
    var client = new Client();
    client.get("http://localhost:3000/tennis-events", function (data, response) {
        res.status(200).json(data);
    });
});


module.exports = app;
