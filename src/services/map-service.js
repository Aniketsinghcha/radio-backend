const { StatusCodes } = require("http-status-codes");
const { GOOGLE_MAP_API_KEY } = require("../config/severConfig");
const { AppError } = require("../utils");
const { default: axios } = require("axios");
const geohash=require('ngeohash');

class MapService{


    async getCoordinatesFromAddress(address){

        try {
            const latLong= await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},+CA&key=${GOOGLE_MAP_API_KEY}`);
          //  console.log(Object.keys(latLong.data));
           
         const data=(latLong.data.results[0].geometry.location);
                return data;
            
        } catch (error) {
            throw  new AppError('Error in Map Service','cant fetch latitude and longitude from adrress',StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getAddressFromCoordinates(lat,long){
        try {
              const adress= await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_MAP_API_KEY}`);
              return adress.data.results[0].formatted_address;
            
        } catch (error) {
            throw  new AppError('Error in Map Service','cant fetch latitude and longitude from adrress',StatusCodes.INTERNAL_SERVER_ERROR);   
        }
    }
     async getAutoCompleteSuggestion(preFixAddress,lat,long){
        try {
            const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${preFixAddress}&key=${GOOGLE_MAP_API_KEY}&location=${lat},${long}&radius=5000`;
            const data=  await axios.get(url);
            const allPredicition=data.data.predictions;
            const descriptionForAllPrediction=[];
            allPredicition.forEach((prediction)=>{
                    descriptionForAllPrediction.push(prediction.description);
            })
            console.log(descriptionForAllPrediction);
             return descriptionForAllPrediction;
        } catch (error) {
            console.log(error);
            throw  new AppError('Error in Map Service','cant fetch adresss from some prefix address ',StatusCodes.INTERNAL_SERVER_ERROR); 
        }

     }

     async getEstimatedTimeAndDistanceForArrival(srcAddress,destAddress){
        try {
            const url=`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destAddress}&origins=${srcAddress}&key=${GOOGLE_MAP_API_KEY}`;
              const eta=await axios.get(url);
              const {distance:{text : ArrivalDistance},duration:{text:durationTime}}=eta.data.rows[0].elements[0];
              console.log(ArrivalDistance,durationTime);
              return {ArrivalDistance,durationTime};
        } catch (error) {
           console.log(error);
            throw new AppError('Error within Map Service','some internalIssue while calculating eta',StatusCodes.INTERNAL_SERVER_ERROR);
        }
     }

      getHashCode(lat,long){
        try {
            const hashCode=  geohash.encode(lat,long,5);
            return hashCode;
            
        } catch (error) {
            console.log('error while fetching the hashCode');
            throw error;
        }
     }

     getNeighBours(lat,long){
        try {
             const GeoHash=  this.getHashCode(lat,long);
             console.log(GeoHash);
            const allNeighBours=geohash.neighbors(GeoHash);
            console.log('all neighBouring drivers :',allNeighBours);
            return allNeighBours;
        } catch (error) {
            console.log('error while fetching neighBours of User');
            console.log(error);
            throw error;
        }
     }
};

module.exports=MapService;