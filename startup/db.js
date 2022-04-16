const mongoose = require('mongoose');


module.exports = function(){
    mongoose.connect('mongodb://localhost/Companies')
    .then(() => { console.log('Connected to Mongo-DB....') })
    .catch(err => console.error('Unable to connect to Mongo-DB....'));

}