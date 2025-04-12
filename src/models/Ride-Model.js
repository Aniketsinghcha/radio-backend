const mongoose=require('mongoose');

const RideModelSchema=mongoose.Schema({
     driversId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Drivers',
     },
     UsersId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Users',
     },
     SrcAddress:{
        type:String,
        required:true,
     },
     destAddress:{
        type:String,
        required:true,
     },
     estimatedTime:{
        type:String,
        required:true,
     },
     estimatedDistance:{
        type:String,
        required:true,
     },
     OTP:{
        type:String,
        required:true,
     },
     status:{
        type:String,
        enum:['STARTED','ENDED','PENDING','ACCEPTED','CANCELLED','ONGOING'],
        default:'PENDING',
     }
});

const Rides=mongoose.model('Rides',RideModelSchema);
module.exports=Rides;