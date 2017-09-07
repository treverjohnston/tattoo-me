var env = require('./env')
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var defaultErrorHandler = require('./handlers').defaultErrorHandler
var corsOptions = require('./handlers').corsOptions
var api = require('../models')
var session = require('../authentication/sessions')
var Auth = require('../authentication/auth')
var Cloudinary = require('cloudinary');

Cloudinary.config({
	cloud_name: 'tattoo-me',
	api_key: '721159567314847',
	api_secret: '0Pwe5bkv0figlWHZGPW8Nw07xTI',
})

// ENABLE ROUTES IF USING app SIDE ROUTING
// import routes from './routes'

let app = express()
let server = require('http').createServer(app)

function Validate(req, res, next) {
    // ONLY ALLOW GET METHOD IF NOT LOGGED IN 
    console.log(req.session)
    if (req.method !== 'GET' && !req.session.uid) {
        return res.send({ error: 'Please Login or Register to continue' })
    }
    return next()
}

function logger(req, res, next) {
    console.log('INCOMING REQUEST', req.url)
    next()
}

// REGISTER MIDDLEWARE
app.use(session)
// app.use(express.static(__dirname + '/../../www/dist'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('*', logger)
app.use('*', cors(corsOptions))
app.use('/', Auth)

// LOCKS API TO REQUIRE USER AUTH
app.use(Validate)
app.use('/api', api)
app.use('/', defaultErrorHandler)

let io = require('socket.io')(server, {
    origins: '*:*'
})

io.on('connection', function (socket) {
    socket.emit('CONNECTED', {
        socket: socket.id,
        message: 'Welcome to the Jungle'
    })

    socket.on('update', (d) => {
        console.log(d)
    })

})

module.exports = server