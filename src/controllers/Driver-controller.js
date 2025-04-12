const { SuccessResponse, ErroResponse } = require('../utils');
const {DriverService}=require('../services');
const driverService= new DriverService();
async function createDriver(req,res){
    try {
        const data={
             name:req.body.name,
             age:req.body.age,
             PhoneNumber:req.body.PhoneNumber,
             CabType:req.body.CabType,
             CabNumber:req.body.CabModel,
             CabModel:req.body.CabModel,
        };
        console.log(data);
        const  driver= await driverService.createDriver(data);
        SuccessResponse.data=driver;
       return   res.status(SuccessResponse.StatusCode).json(SuccessResponse);
    } catch (error) {
        console.log(error);
           ErroResponse.error=error;
           return res.status(ErroResponse.StatusCode).json(ErroResponse);
    }
}
// Controller Layer
async function updateDriverLocation(req, res) {
   try {
       // Extract data from the request body
       const { driversId, lat, long } = req.body;

       // Validate the input data
       if (!driversId || isNaN(lat) || isNaN(long)) {
           return res.status(400).json({
               success: false,
               message: 'Missing or invalid required fields: driversId, lat, or long'
           });
       }
     console.log('we are the controller and here are the values :',driversId,lat,long);
       // Parse lat and long as floats (ensure they are valid numbers)
       const latParsed = parseFloat(lat);
       const longParsed = parseFloat(long);

       if (isNaN(latParsed) || isNaN(longParsed)) {
           return res.status(400).json({
               success: false,
               message: 'Lat or long is invalid. Please provide valid numeric values.'
           });
       }

       
       const data = {
           driversId: driversId,
           lat: latParsed,
           long: longParsed
       };

        
       const result = await driverService.updateDriverLocation(data);
   
       return res.status(200).json({
           success: true,
           data: result
       });

   } catch (error) {
       console.log('Error in controller layer:', error);
       return res.status(500).json({
           success: false,
           message: 'Internal Server Error',
           error: error.message
       });
   }
}

module.exports = {
   updateDriverLocation
};


 


module.exports={
      createDriver,
      updateDriverLocation,
}