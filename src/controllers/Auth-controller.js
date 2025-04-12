const { SuccessResponse, ErroResponse } = require('../utils');
const {AuthService}=require('../services');
const authService=new AuthService();
async function signUp(req,res){
    try {
        const service= req.body.service;
        const data=(service=='driver')?{name:req.body.name,
            age:req.body.age,
            PhoneNumber:req.body.PhoneNumber,
            CabType:req.body.CabType,
            CabNumber:req.body.CabNumber,
            CabModel:req.body.CabModel,}:{name:req.body.name,
                PhoneNumber:req.body.PhoneNumber,
                Address:req.body.Address,
                Country:req.body.Country,
                City:req.body.City};
                console.log('we are at auth service');
                console.log('Service is :',service);
                console.log('Data is : ',data);
            const dt=await authService.signUp(data,service);
            console.log('kya hum kar paye data create');
            SuccessResponse.data=dt;
            return res.status(SuccessResponse.StatusCode).json(SuccessResponse);
    } catch (error) {
        ErroResponse.error=error;
        return res.status(ErroResponse.StatusCode).json(ErroResponse);
    }

};

async function signIn(req,res){


    try {
        console.log(req.body);
        const data={
            name:req.body.name,
            PhoneNumber:req.body.PhoneNumber,
        };
        const service=req.body.Service;
        const token=await authService.signIn(data,service);
        SuccessResponse.data=token;
        return res.status(SuccessResponse.StatusCode).json(SuccessResponse);
    } catch (error) {
        ErroResponse.error=error;
        return res.status(ErroResponse.StatusCode).json(ErroResponse);
    }

}
module.exports={
    signUp,
    signIn,
}