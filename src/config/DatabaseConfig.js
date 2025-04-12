  const { mongoose } = require('mongoose');
const ServerConfig=require('./severConfig')
const { AppError } = require('../utils');
console.log(ServerConfig);
  const {DB_URL}=ServerConfig;

 async function setUpDataBase(database){
    try {
      const  dbUrl=`${DB_URL}${database}`;
      const connection=await mongoose.connect(dbUrl);
      console.log('databseConnected',connection[' _connectionString']);
    } catch (error) {
        throw new AppError(error.name,'Error while connecting to the DB');
    }

};
module.exports=setUpDataBase;