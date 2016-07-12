'use strict';

var express      =  require('express'),
    http         =  require('http'),
    bodyParser   =  require('body-parser'),
    mongoose     =  require('mongoose'),
    async        =  require('async'),
    cors         =  require('cors'),
    fs           =  require('fs'),
    log          =  require('./log'),
    useragent    =  require('express-useragent'),
    compression  =  require('compression'),
    serveStatic  =  require('serve-static'),
    config       =  require('./config');

var app = {};
var routes       =  require('./routes');

var corsOptionsDelegate = function(req, callback){
    var site = req.site;
    var corsOptions = { origin: false };
    if(site && site.isCorsEnabled){
        corsOptions.origin = true;
        corsOptions.credentials = true;
    }
    callback(null, corsOptions);
};

app.server = express();
app.log = log;
app.config = config;

// SERVER INIT
app.server.use(compression());
app.server.use(useragent.express());

app.server.use(bodyParser.json({ limit: '50mb' }));

app.server.use(function (req, res, next) {
    
    req.app = app;
    
    next();
});

app.server.use(cors(corsOptionsDelegate));

routes.init(app);

app.server.get('/*', serveStatic(__dirname + '/..', {etag: false}));

app.server.use(
    function (req, res, next) {
        var indexFile = "index.html", rootDir = '.';
        var path = url.parse(req.url).pathname;

        console.log(path);

        return fs.readFile('./' + rootDir + path, function (err, buf) {
            if (!err) {
                return next();
            }
            if (path.substring(path.length - 4) == 'html') { // if html file not found
                res.writeHead(404);
                return res.end('Not found');
            }

            return fs.readFile(__dirname + rootDir +'/' + indexFile, function (error, buffer) {
                var resp;
                if (error) {
                    return next(error);
                }
                resp = {
                    headers: {
                        'Content-Type': 'text/html',
                        'Content-Length': buffer.length
                    },
                    body: buffer
                };
                res.writeHead(200, resp.headers);
                return res.end(resp.body);
            });
        });
    }
);

exports.start = function (cb) {
    var startDate = Date.now();
    app.log.debug('Starting', config.get('env'), 'configuration ...');

    app.httpServer = http.createServer(app.server);

    app.log.debug('Http server starting at', config.get('http.port'), '...');
    app.httpServer.listen(config.get('http.port'), next);

    cb();
}