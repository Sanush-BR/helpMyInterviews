require('express-async-errors');
const express = require('express');
const app = express();

require('./startup/config')();
require('./startup/db')();
require('./startup/routes')(app);
require('./startup/prod')(app);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));