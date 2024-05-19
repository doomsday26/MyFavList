import { Types } from 'mongoose';
import { IUser } from '../models/user';
import userModel from '../models/user';
import { ICreateUserDetails, IUpdateUSerDetails } from '../utils/types';
export default class UserRepository {
    private _model = userModel;
async getUserById(userId: Types.ObjectId): Promise<IUser|null> {
    const user= await this._model.findById(userId);
    return user;
}
async getUserByEmail(email:string): Promise<IUser|null> {
    const user= await this._model.findOne({email});
    return user;
}
async createUser(userDetails:ICreateUserDetails): Promise<IUser> {
    const newUser= await this._model.create(userDetails);
    return newUser;
  }

async updateUserProfile(userDetails:IUpdateUSerDetails):Promise<IUser|null>{
    const { userId,username,email,password,img}:IUpdateUSerDetails = userDetails;
    return this._model.findOneAndUpdate(
        { _id: userId },
        {
            $set: {
                username,
                email,
                password,
                img,
            }
        },
        { new: true, omitUndefined: true, runValidators: true });
}
}
