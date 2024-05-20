import { IUserListItem } from '../models/userListItem';
import UserRepository from '../repository/user.repository';
import UserListItemRepository from '../repository/userListItem.repository';
import {Types} from 'mongoose'
import { IuserListQuery } from '../utils/types';
import { BadRequestError, InternalError } from '../utils/error';
import { addAllItemsToCachedList, checkUserListCache, getCachedUserList, updateList } from '../utils/cache';

export class UserService {

    constructor(private readonly UserListRepository: UserListItemRepository) { }
async getUsersList(query:IuserListQuery):Promise<IUserListItem[]|null>{
const {userId, isFavourite, genre,skip,limit,sort} = query
//check if cached
let checkCached= await checkUserListCache(String(userId));
// console.log({checkCached})
if(checkCached){
  return await getCachedUserList(String(userId));

}else{
    const response = await this.UserListRepository.getUserListItems({userId, isFavourite, genre,skip,limit,sort});
    // console.log(response)
    if(!response?.length) throw new Error('no content found');
    await addAllItemsToCachedList(String(userId), JSON.stringify(response));
    return response;}
};


async deleteUserListItem(userId:string,listItemId:string):Promise<IUserListItem[]|null>{
    const response = await this.UserListRepository.removeListItem(new Types.ObjectId(String(listItemId)));
    if(!response)throw new Error('item not found');
    const newList = await this.UserListRepository.getUserListItems({userId,isFavourite:undefined,genre:undefined,skip:0,limit:10,sort:1});
    await updateList(userId,JSON.stringify(newList))
    return newList
   
}

async addUserListItem(listItemData:IUserListItem):Promise<IUserListItem[]|null>{
    const{userId,contentId,title,description}=listItemData
    if(!userId || !contentId||!description||!title)throw new BadRequestError('invalid data or some field sare missing');
    
    const item= await this.UserListRepository.getListItem(new Types.ObjectId(String(userId)), new Types.ObjectId(String(contentId)));
    if(item)throw new  BadRequestError('item already present');
    
    const listItem = await this.UserListRepository.addToUserList(new Types.ObjectId(String(userId)), new Types.ObjectId(String(contentId)),title,description);
    if(!listItem)throw new InternalError('error occured');
    const newList = await this.UserListRepository.getUserListItems({userId:String(userId), isFavourite:undefined, genre:undefined, skip:0, limit:10, sort:1});
    let updated=await updateList(String(userId),JSON.stringify(newList))
    // console.log(updated)
    return newList;
}

}

export default new UserService(new UserListItemRepository());