const {UserService}=require('../services');
const { SuccessResponse, ErroResponse } = require('../utils');

const userService= new UserService();
async function createUser(req,res){
      try {
        console.log('controller Called');
        console.log(req.body);
        console.log(req.body.City,req.body.Country,req.body.name,req.body.PhoneNumber,req.body.Address);

        const data={
            name:req.body.name,
            PhoneNumber:req.body.PhoneNumber,
            Address:req.body.Address,
            Country:req.body.Country,
            City:req.body.City
        };
        console.log("data",data);
        const user= await userService.createUser(data);
         SuccessResponse.data=user;
         return res.status(SuccessResponse.StatusCode).json(SuccessResponse);
      } catch (error) {
        console.log('seedha errr');
        console.log(error);
           return res.status(ErroResponse.StatusCode).json(ErroResponse);
        
      }
};
module.exports={
   createUser
}