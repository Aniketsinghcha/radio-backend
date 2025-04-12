const CrudRepositry=require('../repositries/Crud-repositry');
const {Rides}=require('../models');

class RideRepositry extends CrudRepositry{

    constructor(){
        super(Rides);
    }
    async create(data){
        try {
            console.log('this model is :',this.model);
            
            const newData= await Rides.create(data);
            return newData;
        } catch (error) {
            console.log(Object.keys(error));
            
            throw error;
        }
    };
    async getRideDetails(query){
        try {
              return await Rides.findOne({$and:[{$or:[{status:'STARTED'},{status:"ACCEPTED"}]},query]}).populate('driversId').populate('UsersId');
        } catch (error) {
            console.log(Object.keys(error));
            throw error;
        }
    }
    async updateRide(id,update){
        try {
            const rd=await Rides.findByIdAndUpdate(id,update,{new:true}).populate('driversId').populate('UsersId');
            return rd;
        } catch (error) {
            console.log(error.message);
             throw error;
        }
    }
};
module.exports=RideRepositry;