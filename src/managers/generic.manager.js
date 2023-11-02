export default class BasicManager{
    constructor(model, populate){
        this.model = model;
        this.populate = populate
    }
    async findAll(){
        try {
            const response = await this.model.find()
            return response
        } catch (error) {
            return error
        }
    }
    async findById(id){
        try {
            const response = await this.model.findById(id)
            return response
        } catch (error) {
            return error
        }
    }
    async createOne(obj){
        try {
            const response = await this.model.create(obj)
            return response
        } catch (error) {
            return error
        }
    }
    async deleteOne(id){
        try {
            
        } catch (error) {
            return error
        }
    }
}