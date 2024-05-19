import { IUserListItem } from '../models/userListItem';
import UserRepository from '../repository/user.repository';
import UserListItemRepository from '../repository/userListItem.repository';
import {Types} from 'mongoose'
import { IuserListQuery } from '../utils/types';

export class UserService {

    constructor(private readonly UserListRepository: UserListItemRepository) { }
async getUsersList(query:IuserListQuery):Promise<IUserListItem[]|null>{
const {userId, isFavourite, genre,skip,limit,sort} = query
    const response = await this.UserListRepository.getUserListItems({userId, isFavourite, genre,skip,limit,sort});
    return response;
};


async deleteUserListItem(listItemId:string):Promise<IUserListItem|null>{
    const response = await this.UserListRepository.removeListItem(new Types.ObjectId(String(listItemId)));
    if(!response)throw new Error('item not found');
    return response;
}

async addUserListItem(userId:String, contentId:String):Promise<IUserListItem|null>{
    if(!userId || !contentId)throw new Error('userId and contentId are required');
    const item= await this.UserListRepository.getListItem(new Types.ObjectId(String(userId)), new Types.ObjectId(String(contentId)));
    if(item)throw new Error('item already exists in the list');
    const response = await this.UserListRepository.addToUserList(new Types.ObjectId(String(userId)), new Types.ObjectId(String(contentId)));
    return response;
}

}

export default new UserService(new UserListItemRepository());