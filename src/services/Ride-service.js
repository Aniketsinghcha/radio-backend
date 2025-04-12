const {Rides}=require('../models');
 const {RideRepositry}=require('../repositries');
const { AppError } = require('../utils');
 const rideRepositry= new RideRepositry();
 const otpGenerator= require('otp-generator');
class RideService {


    async createRideService(data){

        try {
            console.log('data.driversId :', data.driversId);
            console.log('data.UsersId :', data.UsersId);
            console.log('data.SrcAddress :', data.SrcAddress);
            console.log('data.destAddress :', data.destAddress);
            console.log('data.estimatedTime :', data.estimatedTime);
            console.log('data.estimatedDistance :', data.estimatedDistance);
            console.log('data.OTP :', data.OTP);
            if(!data.driversId || !data.UsersId || !data.SrcAddress || !data.destAddress || !data.estimatedTime || !data.estimatedDistance || !data.OTP){
                throw new AppError('Create Ride Error',"One or more arguments missing or invalid",400);
            }
            const rideModel=await rideRepositry.create(data);
            return rideModel;
        } catch (error) {
              throw error;
        }

    }
    async generateOTP(){
        try {
            const  OTP=otpGenerator.generate(4,{upperCaseAlphabets:false,specialChars:false,lowerCaseAlphabets:false});
             return OTP;
            
        } catch (error) {
             throw error;
        }
    }
     async getRideDetails(query){
        try {
            const rideDetails=await rideRepositry.getRideDetails(query);
             return rideDetails;
        } catch (error) {
            throw error;
        }
     }
     async updatedRide(id,update){
         try {
            console.log('inside the new updated ride ');
            const rd=await rideRepositry.updateRide(id,update);
            return rd;
         } catch (error) {
            
         }
     }
     calculateFare(distance, time, surgeMultiplier = 1.0) {
        
        const baseFare = 20;  
        const distanceRate = 10; // Cost per mile
        const timeRate = 5; // Cost per minute
      
        const distanceFare = distance * distanceRate;
        const timeFare = time * timeRate;
        let totalFare = baseFare + distanceFare + timeFare;
        totalFare *= surgeMultiplier;
      
        return totalFare.toFixed(2); 
      }

}
module.exports=RideService;
