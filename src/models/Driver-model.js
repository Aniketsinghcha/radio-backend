const mongoose=require('mongoose');
const {Schema}=require('mongoose');

const DriverSchema= mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    age:{
         type:Number,
         required:true,
    },
    PhoneNumber:{
        type:'String',
        required:true,
    },
    CabType:{
        type:String,
        enum:['Car','Auto','Bike',"Scooty"],
    },
    CabNumber:{
        type:String,
        required:true,
    },
    CabModel:{
        type:String,
        required:true,
    },
    socketId:{
        type:String,
        default:null,
    }
},{strict:false});
const Drivers= mongoose.model('Drivers',DriverSchema);

module.exports=Drivers;