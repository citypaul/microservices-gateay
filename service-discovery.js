var Client = require('node-rest-client').Client;

module.exports = function () {

    function getAddress(serviceName, cb) {

        var client = new Client();

        client.get('http://172.29.66.157:8500/v1/catalog/service/' + serviceName, function (data){
            cb(data[0].ServiceAddress);
        });
    }

    return {
        getAddress: getAddress
    }
};