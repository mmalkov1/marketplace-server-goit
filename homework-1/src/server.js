const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const app = express();


const startServer = port => {
  app
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(morgan('dev'))
    .use('/', router)

  app.listen(port);

  console.log('Server is started ...');
};

module.exports = startServer;
