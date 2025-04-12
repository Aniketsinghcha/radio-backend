 
 
const {UserRepositry}=require('../repositries');
 const userRepositry= new UserRepositry();

class UserService{

    async createUser(data){
        try {
            const newUser= userRepositry.create(data);
            return newUser;
            
        } catch (error) {
            console.log(eror.errors);
            throw error;
        }
    }
    async updateUserSocketId(UserId,SocketId){
        try {
            const dt=await userRepositry.updateSocketId(UserId,SocketId);
            return dt;
            
        } catch (error) {
            throw error;
        }
    }
    async getUserByid(id){
        try {
             const user=await userRepositry.getById(id);
             return user;
        } catch (error) {
            throw error;
        }
    }
};

module.exports=UserService;

