exports.init = function (app) {
    app.server.get('/api/product', function(req, res, next) {
        
        next();
    });

    app.server.get('/api/product/:id', function(req, res, next) {

        next();
    });

    app.server.post('/api/product', function(req, res, next) {

        next();
    });

    app.server.put('/api/product/:id', function(req, res, next) {

        next();
    });

    app.server.delete('/api/product/:id', function(req, res, next) {

        next();
    });
}