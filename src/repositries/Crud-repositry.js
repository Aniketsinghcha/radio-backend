
class CrudRespositry{
    constructor(model){
        this.model=model;
    };
    async create(data){
        try {
            console.log('this model is :',this.model);
            
            const newData= await this.model.create(data);
            return newData;
        } catch (error) {
            console.log(Object.keys(error));
            
            throw error;
        }
    };

    async get(query){
        try {
            console.log('here is the query',query);
            console.log('here is  the model',this.model);
            const data=await this.model.findOne(query);
            console.log(data);
            return data;
        } catch (error) {
            console.log(Object.keys(error));
            throw error;
        }
    };
    async getById(Id){
        try {
            const data=await this.model.findById(Id);
            return data;
        } catch (error) {
            console.log(Object.keys(error));
            throw error;
        }
    }
    async update(id,data){
        try {
            const updatedData=await this.model.findByIdAndUpdate(id,data);
            return updatedData;
        } catch (error) {
            console.log(Object.keys(error));
            throw error;
        }
    };
    async delete(id){
        try {
            const data=await this.model.findByIdAndDelete(id);
            return data;
        } catch (error) {
            console.log(Object.keys(error));
            throw error;
        }
    }

};
module.exports=CrudRespositry;