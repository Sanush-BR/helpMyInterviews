const mongoose = require('mongoose');
const config = require('config');

module.exports = function(){

    // const db = config.get('db');
    const db = 'mongodb+srv://SanushBR:sanush@123@cluster0.j4vrt.mongodb.net/Company_db?retryWrites=true&w=majority';
    mongoose.connect(db)
    .then(() => { console.log(`Connected to ${db}....`)})
    .catch(err => console.error('Unable to connect to Mongo-DB....'));
}