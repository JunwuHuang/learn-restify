const restify = require('restify')
const corsMiddleware = require('restify-cors-middleware')
const USERS_ROUTES = require('./routes/users')
const TWEETS_ROUTES = require('./routes/tweets')

const server = restify.createServer()

const cors = corsMiddleware({
    origins: ['*']
})

server.use(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())
server.get('/', function(req, res, next) {
    res.send('Hello World')
    next()
})

USERS_ROUTES.register(server)
TWEETS_ROUTES.register(server)

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url)
})