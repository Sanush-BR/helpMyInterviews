const helmet = require('helmet');
const express = require('express');
const error = require('../middleware/error');
const morgan = require('morgan');
const cors = require('cors');

const apple = require('../routes/apple');
const amazon = require('../routes/amazon');
const adobe = require('../routes/adobe');
const infosys = require('../routes/infosys');
const microsoft = require('../routes/microsoft');
const wipro = require('../routes/wipro');
const tcs = require('../routes/tcs');
const ibm = require('../routes/ibm');
const meta = require('../routes/meta');
const google = require('../routes/google');
const cisco = require('../routes/cisco');
const intel = require('../routes/intel');
const user = require('../routes/user');
const auth = require('../routes/auth');

module.exports = function(app){
    app.use(cors());
    app.use(helmet());
    app.use(morgan('tiny'));
    app.use(express.json());
    app.use('/api/amazon', amazon);
    app.use('/api/infosys', infosys);
    app.use('/api/microsoft', microsoft);
    app.use('/api/wipro', wipro);
    app.use('/api/apple', apple);
    app.use('/api/adobe', adobe);
    app.use('/api/tcs', tcs);
    app.use('/api/ibm', ibm);
    app.use('/api/meta', meta);
    app.use('/api/google', google);
    app.use('/api/cisco', cisco);
    app.use('/api/intel', intel);
    app.use('/api/user', user);
    app.use('/api/auth', auth);
    app.use(error);
}