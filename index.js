const restify = require('restify')

const server = restify.createServer()

server.get('/', function(req, res, next) {
    res.send('Hello World')
    next()
})

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url)
})