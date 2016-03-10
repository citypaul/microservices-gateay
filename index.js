var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Client = require('node-rest-client').Client;
var amqp = require('amqplib/callback_api');
var serviceDiscovery = require('./service-discovery')();

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
    serviceDiscovery.getAddress('receiver', function (address) {
        var client = new Client();
        client.get('http://' + address + ':3000/tennis-events', function (data) {
            res.status(200).json(data);
        });
    });
});


module.exports = app;
