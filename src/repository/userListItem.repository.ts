import userListItem,{IUserListItem} from "../models/userListItem";
import {Types} from "mongoose";
import { IuserListQuery } from "../utils/types";
import {getCachedUserList,addToCacheList, addAllItemsToCachedList,}  from "../utils/cache";
export default class UserListItemRepository {
    private _model = userListItem;

async getUserListItems(params: IuserListQuery): Promise<IUserListItem[] | null> {
    let { userId, isFavourite, genre, skip, limit, sort } = params;
    let query:Record<string,any> = { userId:new Types.ObjectId(String(userId))};
    if (isFavourite !== undefined) query["isFavourite"] = isFavourite;
    if (genre) query["genre"] = genre;
if(!limit||limit<10)limit=10;
if(!skip)skip=0;
if(!sort)sort=-1;

    const userListItems = await this._model.aggregate([
        { $match: { userId: new Types.ObjectId(String(userId)) } },
        { $skip: skip }, // Skip 0 documents (start from the beginning)
        { $limit: limit }, // Limit the result to 10 documents
        {$project:{contentId:1,title:1,description:1}}
    ])

   
    return userListItems;
}




async addToUserList(userId: Types.ObjectId,contentId:Types.ObjectId,title:String,description:String): Promise<IUserListItem|null> {
let item= await this._model.create({userId, contentId,title,description});
return item;
  }
  async getListItem(userId: Types.ObjectId,contentId:Types.ObjectId): Promise<IUserListItem|null> {
   const item= await this._model.findOne({userId,contentId})
   return item
   }

async removeListItem(listItemId: Types.ObjectId): Promise<IUserListItem|null> {
    const item= await this._model.findOneAndDelete({_id:listItemId})
    if(!item) return null;
// if(item) removeFromCacheList(String(item.userId),String(item.contentId),JSON.stringify({title:item.title,description:item.description}))

   return item
   }
   

}

