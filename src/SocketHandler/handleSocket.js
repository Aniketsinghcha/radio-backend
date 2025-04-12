const {MapService, UserService, DriverService,RideService}=require('../services');
const mapService= new MapService();
const userService= new UserService();
const driverService=new DriverService();
const rideService=new RideService();
async function handleSockets(io,socket){


   socket.on('RequestRide',async ({user,srcAddress,destAddress},callback)=>{
    const {lat,lng}=await mapService.getCoordinatesFromAddress(srcAddress);
    const updatedUserSocketId=await userService.updateUserSocketId(user._id,socket.id);
       const allNearbyDrivers= await driverService.getNearbyDrivers( lat,lng);
       console.log(allNearbyDrivers);
       const allNearByDriversSocketId=[];
       allNearbyDrivers.forEach((nearbyDriver)=>{
         if(nearbyDriver?.driversId){
             const {socketId}=nearbyDriver.driversId;
              allNearByDriversSocketId.push([socketId,nearbyDriver?.driversId]);
         }
       })
      allNearByDriversSocketId.forEach(([socketId,nearbyDriver])=>{
         socket.to(socketId).emit('NearbyPassenger',{updatedUserSocketId,srcAddress,destAddress,nearbyDriver});
      })
   });
   socket.on('find-passengers',async (driver,data,callBack)=>{
      //driver ->whole driver
      //data ->{drivers.id,lat,long};
      const updatedDriverSocketId=await driverService.updateDriversSocketId(driver._id,socket.id);
       data.driversId=driver._id;
       const  driverAvaliablity=await driverService.updateDriverLocation(data);
        callBack(driverAvaliablity.driversId);
   });
   socket.on('accept-ride',async (driver,user,srcAddress,destAddress)=>{
      // we should create a ride model and for that ig we need to calculate the
      console.log('we are here insdie the accept-ride event with the following data here');
      const {ArrivalDistance,durationTime}=await mapService.getEstimatedTimeAndDistanceForArrival(srcAddress,destAddress);
       const data={};
       data.driversId=driver._id;
       data.UsersId=user?._id;
       data.SrcAddress=srcAddress;
       data.destAddress=destAddress;
       data.status='ACCEPTED';
       data.estimatedTime=durationTime;
       data.estimatedDistance=ArrivalDistance;
       data.OTP=await rideService.generateOTP();
   const rideModel=await rideService.createRideService(data);
   const socketOfUser=user.socketId;
    socket.to(socketOfUser).emit('Ride-accepted',rideModel);
   });
   socket.on('startRide',async(data)=>{
      // data={driver{id},OTP};
         const requiredRide=await rideService.getRideDetails({driversId:data.driver});
         const requiredOTP=requiredRide.OTP;
         if(requiredOTP!=data.OTP){
            socket.emit('wrongOTP',{'message':"wrong OTP Submmited"});
            return ;
         }
         const updatedRide=await rideService.updatedRide(requiredRide._id,{status:'STARTED'});
         const user=await userService.getUserByid(requiredRide.UsersId._id);
         console.log(requiredRide.driversId.socketId,requiredRide.UsersId.socketId,user.socketId);
         
         await socket.to(requiredRide.driversId.socketId).emit('ride-started',updatedRide);
         await io.to(requiredRide.UsersId.socketId).emit('ride-started',updatedRide);
        // await  socket.to(user.socketId).emit('ride-started',updatedRide);

   })
  socket.on('update-driver-location',async(data)=>{
   // data={driversId,lat,long}
      const updatedDriver=await driverService.updateDriverLocation(data);
     //  const driversId=(updatedDriver?.driversId?._id)?updatedDriver.driversId._id :updatedDriver.driversId;
       const ride=await rideService.getRideDetails({driversId:data.driversId});
       if(ride){
       await  io.to(ride.UsersId.socketId).emit('updated-driver-location',updatedDriver);
        await io.to(ride.driversId.socketId).emit('updated-driver-location',updatedDriver);
       }
   
  });
  socket.on('end-ride',async(ride)=>{
   //ride ->ride model
       const updateRide=await rideService.updatedRide(ride._id,{status:'ENDED'});
       const farePrice= rideService.calculateFare(updateRide.estimatedDistance,updateRide.estimatedTime);
       if(updatedRide.UsersId.socketId && updateRide.driversId.socketId){
           await io.to(updatedRide.UsersId.socketId).emit('ended-ride',{farePrice,updateRide});
           await io.to(updateRide.driversId.socketI).emit('ended-ride',{farePrice,updateRide});
       }


  })
   


};

module.exports=handleSockets;