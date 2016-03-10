var Client = require('node-rest-client').Client;

module.exports = function () {

    function getAddress(serviceName, success, error) {
        var client = new Client();
        var consulIP = process.env.CONSULIP ? process.env.CONSULIP : 'localhost';

        client.get('http://' + consulIP + ':8500/v1/catalog/service/' + serviceName, function (data) {
            if (data.length > 0) {
                success(
                    {
                        address: data[0].ServiceAddress,
                        port: data[0].ServicePort
                    }
                );
            }
            error();
        });
    }

    return {
        getAddress: getAddress
    }
};