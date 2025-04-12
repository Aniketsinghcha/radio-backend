const mongoose=require('mongoose');

const UserSchema=  mongoose.Schema({
     name:{
        type:String,
        required: true
     },
     PhoneNumber:{
        type:String,
        required: true,
        max:12,
        
     },
     Address:{
        type:String
     },
     Country:{
        type:String,
        required: true,
     },
     City:{
        required: true,
        type:String,
     },
     socketId:{
       type:String,
       default:null,
     }
});

const Users= mongoose.model('Users',UserSchema);
module.exports=Users;