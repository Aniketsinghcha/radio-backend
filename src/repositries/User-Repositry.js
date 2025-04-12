const CrudRespositry = require("./Crud-repositry");
const {User}=require('../models');
const mongoose=require('mongoose');
class UserRepositry extends CrudRespositry{
    constructor(){
        super(User);
    }

    async updateSocketId(query, socketId) {
        try {
            // Ensure query is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(query)) {
                throw new Error('Invalid driver ID');
            }
    
            // console.log('this is id:', query);
            // console.log('this is socket id:', socketId);
    
            // Find the driver by its ID
            const user = await User.findById(query);
    
            if (!user) {
                throw new Error('Driver not found');
            }
    
            // Dynamically add the socketId field to the driver document
            user.socketId = socketId;
    
            // Log the document after adding the new field
          //  console.log('Document after adding socketId:', user);
    
            // Save the updated document
            await user.save();
    
          //  console.log('Updated driver data:', user);
            return user;
        } catch (error) {
            console.log('Error while updating UsersSocketId:', error);
            throw error;
        }
    }
}
module.exports=UserRepositry;