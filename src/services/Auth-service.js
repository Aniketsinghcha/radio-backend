const  {AppError}=require('../utils');
const {DriverService,UserService}=require('./index');
 const {SECRET_KEY}=require('../config/severConfig');
 const jwt=require('jsonwebtoken');
const { StatusCodes} = require('http-status-codes');
const { DriverRepositry, UserRepositry } = require('../repositries');
const services = require('./index');
 const dr=new DriverRepositry();
class AuthService {



    async signUp(data,Service){
       try {
        console.log(data,Service);
        if(Service=='driver'){
           return    await new DriverRepositry().create(data);
             
        } else {
          return await new UserRepositry().create(data);
        }
        
       } catch (error) {
    console.log('service error is :',error);
          throw error;
       }
    }
     async signIn(data,Service){
        try {
            console.log('this is the data recieved here',data,Service);
            const {name,PhoneNumber}=data;
            const query={
                name:name,
                PhoneNumber:PhoneNumber,
           }
           let validData;
            if(Service=='driver'){
                console.log('we are this service');
              validData=await new DriverRepositry().get(query);
            } else validData=await new UserRepositry().get(query);
            if(validData){
                return this.createToken(data);
            }
        } catch (error) {
               console.log(Object.keys(error));
            throw error;
            
        }

     }

       createToken(data){
          try {
            let token= jwt.sign(data,SECRET_KEY,{expiresIn:'1d'});
            return token;
          } catch (error) {
             throw new AppError('Create Token error',"while creating token some error occured",StatusCodes.INTERNAL_SERVER_ERROR);
          }
       }
    verifyToken(token) {
        try {
            const verifiedToken=jwt.verify(token,PRIVATE_KEY);
              return verifiedToken;
        } catch (error) {
            // console.log(Object.keys(error));
            console.log('error occured while verifying token');
            if(error.name='JsonWebTokenError'){
                throw new  AppError(error.message,`your token expired at ${error.expiredAt}`)
            }
            if(error.name=='TokenExpiredError'){
                throw new AppError('Token Expired',`the token that is being send is already expired ${new Date(error.expiredAt)}`);
            }
        }
    };

      

};
module.exports=AuthService;