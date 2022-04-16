const mongoose = require('mongoose');
const config = require('config');

module.exports = function(){
    mongoose.connect(config.get('helpMyInterviews_db'))
    .then(() => { console.log('Connected to Mongo-DB....') })
    .catch(err => console.error('Unable to connect to Mongo-DB....'));

}