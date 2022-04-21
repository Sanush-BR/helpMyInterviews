const mongoose = require('mongoose');



module.exports = function(){
  
    //  const db = 'mongodb+srv://SanushBR:sanush@123@cluster0.j4vrt.mongodb.net/Company_db?retryWrites=true&w=majority';
    
    const db = `mongodb://${process.env.dbUser}:${process.env.dbPassword}@cluster0-shard-00-00.j4vrt.mongodb.net:27017,cluster0-shard-00-01.j4vrt.mongodb.net:27017,cluster0-shard-00-02.j4vrt.mongodb.net:27017/Company_DB?ssl=true&replicaSet=atlas-nhil3m-shard-0&authSource=admin&retryWrites=true&w=majority`;
       
    mongoose.connect(db)
    .then(() => { console.log(`Connected to MongoDB....`)})
    .catch(err => console.error('Unable to connect to Mongo-DB....',err));
}