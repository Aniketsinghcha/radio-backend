const express=require('express');
const bodyParser=require('body-parser');
const apiRouter=require('./routes/index');
const cors=require('cors');
const {Server}=require('socket.io');
const app=express();
const otpGenerator=require('otp-generator');
app.use(express.json());
app.use(express.urlencoded({required:true}));
app.use(cors());
app.use('/api',apiRouter);
const {ServerConfig, InitializeSockets}=require('./config/index');
const setUpDataBase = require('./config/DatabaseConfig');
const initializeSockets = require('./config/SocketConfig');
const {PORT}=ServerConfig;
setUpDataBase('RIDE_DB');
 const server=app.listen(PORT,()=>{
    console.log('The Port is listening to your request');
    
    
 });
initializeSockets(server);