const {Server}=require('socket.io');
const handleSockets = require('../SocketHandler/handleSocket');

function initializeSockets(httpServer) {
    const io= new Server(httpServer,{
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true
          }
    });
    io.on('connection',(socket)=>{
        console.log('connected to socket id Succesfully :',socket.id);
        handleSockets(io,socket);
    });
   
};

module.exports=initializeSockets;