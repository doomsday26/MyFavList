import { Types } from 'mongoose';
import { IUser } from '../models/user';
import UserRepository from '../repository/user.repository';
import { ICreateUserDetails, IUpdateUSerDetails } from '../utils/types';

export class UserService {

constructor(private readonly UserRepository: UserRepository) { }

async getuserDetails(userId:string){
    return this.UserRepository.getUserById(new Types.ObjectId(userId));
};


async updateUserDetails(userProfileDetails:IUpdateUSerDetails){
   const {username,email,password,img,phoneNumber}= userProfileDetails;
   return this.UserRepository.updateUserProfile(userProfileDetails);
};
async createUser(userDetails:ICreateUserDetails):Promise<ICreateUserDetails>{
    return this.UserRepository.createUser(userDetails);
}

}

export default new UserService(new UserRepository());