'use strict';

var log = require('./log.js');

process.on('uncaughtException', function (err) {
    log.error({err: err}, 'Caught exception: ' + err.toString());
    setTimeout(function () {
        process.exit(1);
    }, 500);
});

var startWorker = function () {
    var server = require('./server.js');
    server.start(function (err) {
        if (err) { return log.error(err); }
    });
};

startWorker();