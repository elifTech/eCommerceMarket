'use strict';

var convict = require('convict'),
    path    = require('path');

var config = convict({
    env: {
        doc: 'App environment.',
        format: ['production', 'development'],
        default: 'development',
        env: 'NODE_ENV'
    },
    mongodb: {doc: 'Mongodb connection string', format: String, default: ''},
    http: {
        serveStatic: {doc: 'Enable processing static content requests', format: Boolean, default: true},
        port: {doc: 'Http listening port', format: 'port', default: 8080, env: 'HTTP_PORT'}
    },
});

var filepath = path.resolve(__dirname, '..', 'api', 'cfg', conf.get('env') + '.json');
config.loadFile(filepath);
config.validate();

module.exports = config;