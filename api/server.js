const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const server = express();
const apiRouter = require('../routes/apiRouter');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

// initialize server to set content-type to application/json, allows us to easily pass JSON objects through endpoints
server.use(express.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
// CORS middleware, default cors() permits all cross-origin scripting,
// https://github.com/expressjs/cors
// TODO: this will need to be configured in production
server.use(cors());

// apiRouter will handle addresses passed to the /api endpoint
server.use('/api', apiRouter);

// server.use(allowCrossDomain);

// test http get request
server.get('/', (req, res) => {
    res.status(200).send(`Server is running successfully. This is the root / endpoint.`);
})

module.exports = server;
