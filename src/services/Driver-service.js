const {DriverRepositry}=require('../repositries/index');

const driverRepositry= new DriverRepositry();

class DriverService {


    async createDriver(data){
        try {
            console.log('data at service layer',data);
            const newDriver= await driverRepositry.create(data);
            console.log('new driver recieved');
            return newDriver;
            
        } catch (error) {
            console.log(error.errors);
            console.log(Object.keys(error));
            throw error;
        }
    }
    async  updateDriverLocation(data) {
        try {
             
            const query = { driversId: data.driversId };
    
             
            const update = {
                lat: data.lat,
                long: data.long,
                location: {
                    type: 'Point',  
                    coordinates: [parseFloat(data.long), parseFloat(data.lat)] //  
                },
                 driversId:data.driversId,
            };
    
             
            const result = await driverRepositry.saveDriverLocation(query, update);
    
            return result;  
        } catch (error) {
            console.log('Error in the service layer', error);
            throw error;
        }
    }
    

    async updateDriversSocketId(DriverId,SocketId){
        try {
            const dt=await driverRepositry.updateSocketId(DriverId,SocketId);
            return dt;
            
        } catch (error) {
            throw error;
        }
    }
    async getNearbyDrivers(lat,long){
        try {

            const ans=await driverRepositry.getNearbyDrivers(lat,long);
            return ans;
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getDriverById(id){
        try {
            const driver=await driverRepositry.getById(id);
             return driver;
        } catch (error) {
            console.log(eror.name,error.message);
            throw error;
        }
    }
    
};
module.exports=DriverService;