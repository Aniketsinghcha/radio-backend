const { SuccessResponse, ErroResponse } = require('../utils');
const {MapService}=require('../services');
const { StatusCodes } = require('http-status-codes');
const mapService=new MapService();
async function getCoordinatesFromAddress(req,res){
    try {
        const addrress=req.query.address;
        const latlong=await mapService.getCoordinatesFromAddress(addrress);
           SuccessResponse.data=latlong;
           return res.status(SuccessResponse.StatusCode).json(SuccessResponse);
    } catch (error) {
        ErroResponse.error=error;
        return res.status(ErroResponse.StatusCode).json(ErroResponse);
    }
}
async function getAddressFromCoordinates(req,res){
    try {
        const lat=req.query.lat;
        const long=req.query.long;
        const latlong=await mapService.getAddressFromCoordinates(lat,long);
           SuccessResponse.data=latlong;
           return res.status(SuccessResponse.StatusCode).json(SuccessResponse);
    } catch (error) {
        ErroResponse.error=error;
        return res.status(ErroResponse.StatusCode).json(ErroResponse);
    }

}
async function autoCompleteAddress(req,res){
    try {
        const lat=req.query.lat;
        const long=req.query.long;
        const prefixAdress=req.query.address;
        const address= await mapService.getAutoCompleteSuggestion(prefixAdress,lat,long);
        SuccessResponse.data=address;
        return res.status(SuccessResponse.StatusCode).json(SuccessResponse);
        
    } catch (error) {
        ErroResponse.error=error;
        return res.status(ErroResponse.StatusCode).json(ErroResponse);
        
    }

}
async function calculateEstimatedTimeAndDistanceOfArrival(req,res){
    try {
      const srcAddress=req.query.srcAddress;
      const destAddress=req.query.destAddress;
      const eta= await mapService.getEstimatedTimeAndDistanceForArrival(srcAddress,destAddress);
      console.log('data mil gaya na bhayi');
     // console.log(eta);
        SuccessResponse.data=eta;
        return res.status(SuccessResponse.StatusCode).json(SuccessResponse);
    } catch (error) {
        ErroResponse.error=error;
        console.log('error ho gaya na');
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErroResponse);
    }
}
module.exports={
    getCoordinatesFromAddress,
    getAddressFromCoordinates,
    autoCompleteAddress,
    calculateEstimatedTimeAndDistanceOfArrival,
}