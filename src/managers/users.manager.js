import userModel from "../models/Users.model.js";
import { compareData } from "../utils.js";
import GenericManager from "../managers/generic.manager.js";

class UserManager extends GenericManager{
    constructor(){
        super(userModel)
    }
    async findUserByEmail(email){
        try {
            const user = await userModel.findOne({email})
            return user
        } catch (error) {
            return error
        }
    }
    async createUser(user){
        try {
            const newUser = await userModel.create(user)
            return newUser
        } catch (error) {
            return error
        }
    }
    async authenticateUser(email, password){
        try {
            const user = await this.findUserByEmail(email);
            if (!user) {
                return { success: false, message: 'Incorrect credentials' };
            }
            const isPasswordValid = await compareData(password, user.password);
            if (!isPasswordValid) {
                return { success: false, message: 'Username or password not valid' };
            }
            return { success: true, user };
        } catch (error) {
            return { success: false, message: 'An error occurred during authentication' };
        }
    }
    async deleteUserByEmail(email){
        try {
            const deletedUser = await userModel.findOneAndDelete({email});
            if (!deletedUser) {
                return res.status(400).send({message: "User not found"});
            }
            return deletedUser;
        } catch (error) {
            return error
        }
    }

}
export const userManager = new UserManager()