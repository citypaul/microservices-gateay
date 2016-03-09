var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Client = require('node-rest-client').Client;
var amqp = require('amqplib/callback_api');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/json', function(req, res) {
    amqp.connect('amqp://localhost', function(err, conn) {
        conn.createChannel(function(err, ch) {
            var q = 'queue';
            ch.assertQueue(q, {durable: false});
            ch.sendToQueue(q, new Buffer(JSON.stringify(req.body)));
            console.log(" [x] Sent Data");
        });
    });
    res.status(200).send("OK");
});

app.get('/tennis-events', function(req, res) {
    var client = new Client();
    client.get("http://localhost:3000/tennis-events", function (data, response) {
        res.status(200).json(data);
    });
});



module.exports = app;
