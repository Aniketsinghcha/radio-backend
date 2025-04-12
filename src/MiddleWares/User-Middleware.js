const {StatusCodes}=require('http-status-codes');
const {ErroResponse}=require('../utils');

async function validateUserReq(req,res,next){
            try {
            if(req.body.City && req.body.Country && req.body.PhoneNumber && req.body.Address && req.body.name){
                console.log('all parameters are here');
                next();
            } else {
                ErroResponse.error={
                    City:(req.body.City)? 'isPresent':'isAbsent',
                    Country:(req.body.Country)? 'isPresent':'isAbsent',
                    PhoneNumber:(req.body.PhoneNumber)? 'isPresent':'isAbsent',
                    Address:(req.body.Address)? 'isPresent':'isAbsent',
                    name:(req.body.name)? 'isPresent':'isAbsent',
                   }
                   res.status(StatusCodes.BAD_GATEWAY).json(ErroResponse);
            }
             console.log('kya hua ');   
            } catch (error) {
                ErroResponse.error={
                 City:(req.body.City)? 'isPresent':'isAbsent',
                 Country:(req.body.Country)? 'isPresent':'isAbsent',
                 PhoneNumber:(req.body.PhoneNumber)? 'isPresent':'isAbsent',
                 Address:(req.body.Address)? 'isPresent':'isAbsent',
                 name:(req.body.name)? 'isPresent':'isAbsent',
                }
                res.status(StatusCodes.BAD_GATEWAY).json(ErroResponse);
            }
}



module.exports={
    validateUserReq,

}