const CrudRespositry = require("./Crud-repositry");
const {Drivers,AvaliableDrivers}=require('../models/index');
const ngeohash=require('ngeohash')
const mongoose=require('mongoose');
class DriverRepositry extends CrudRespositry{
    constructor(){
        super(Drivers);
    }
    async  saveDriverLocation(query, update) {
        try {
          //  console.log('Checking if driver exists in the database');
            
             
            const isAlreadyPresent = await AvaliableDrivers.findOne(query);
    
            let data;
            if (isAlreadyPresent) {
                
            //    console.log('Driver found, updating location');
                data = await AvaliableDrivers.findOneAndUpdate(
                    query, 
                    { $set: update },
                    { new: true }  
                ).populate('driversId').exec();
            } else {
               
               // console.log('Driver not found, creating new location');
                data = await AvaliableDrivers.create(update);
            }
    
         //   console.log('Data saved or updated successfully:', data);
            return data; // Return the updated or created driver location data
        } catch (error) {
            console.log('Error in repository layer:', error);
            throw error;
        }
    }
    
    
    async updateSocketId(query, socketId) {
        try {
            // Ensure query is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(query)) {
                throw new Error('Invalid driver ID');
            }
    
            console.log('this is id:', query);
            console.log('this is socket id:', socketId);
    
            // Find the driver by its ID
            const driver = await Drivers.findById(query);
    
            if (!driver) {
                throw new Error('Driver not found');
            }
    
            // Dynamically add the socketId field to the driver document
            driver.socketId = socketId;
    
            // Log the document after adding the new field
            console.log('Document after adding socketId:', driver);
    
            // Save the updated document
            await driver.save();
    
            console.log('Updated driver data:', driver);
            return driver;
        } catch (error) {
            console.log('Error while updating UsersSocketId:', error);
            throw error;
        }
    }
    
    
    
async  getNearbyDrivers(lat, long) {
    try {
        // Define the location point using the provided lat and long
        const location = {
            type: 'Point',
            coordinates: [parseFloat(long), parseFloat(lat)], // [long, lat]
        };

        // 3 km in meters
        const radius = 6000; // 3 kilometers = 3000 meters

        // Perform the geospatial query to find nearby drivers
        const nearbyDrivers = await AvaliableDrivers.find({
            location: {
                $nearSphere: {
                    $geometry: location,
                    $maxDistance: radius, // 3000 meters = 3 kilometers
                },
            },
        }).populate('driversId'); // You can populate driver data here

        return nearbyDrivers;
    } catch (error) {
        console.log('Error in getNearbyDrivers:', error);
        throw error;
    }
}
  

}
  
 
module.exports=DriverRepositry;