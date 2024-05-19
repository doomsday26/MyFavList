import userListItem,{IUserListItem} from "../models/userListItem";
import {Types} from "mongoose";
import { IuserListQuery } from "../utils/types";
import {getCachedUserList,addToCacheList,removeFromCacheList,isMemberOfCacheList,addAllItemsToCachedList}  from "../utils/cache";
export default class UserListItemRepository {
    private _model = userListItem;

async getUserListItems(params: IuserListQuery): Promise<IUserListItem[] | null> {
    const { userId, isFavourite, genre, skip, limit, sort } = params;
    let query:Record<string,any> = { userId:new Types.ObjectId(String(userId))};
    if (isFavourite !== undefined) query["isFavourite"] = isFavourite;
    if (genre) query["genre"] = genre;


    const userListItems = await this._model.aggregate([
        { $match: { userId: new Types.ObjectId(String(userId)) } },
        { $sort: { created_at:1 } }, // Sort by _id in descending order
        { $skip: skip }, // Skip 0 documents (start from the beginning)
        { $limit: limit }, // Limit the result to 10 documents
        { $group: { _id: null, contentIds: { $push: "$contentId" } } },
        { $project: { _id: 1, contentIds: 1 } },
    
    ])
const contentIds=userListItems[0].contentIds.map( (e:Types.ObjectId) =>String(e))
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
 console.log(contentIds)
 await addAllItemsToCachedList(String(userId), contentIds)
    // const userListItems = await this._model.find(query,{contentId:1})
    //     .skip(skip)
    //     .limit(limit)
    //     .sort({ "created_at": 1 });
        // console.log(userListItems[0].contentIds)
// await addAllItemsToCachedList(String(userId), userListItems)
    return contentIds;
}
async addToUserList(userId: Types.ObjectId,contentId:Types.ObjectId): Promise<IUserListItem|null> {
let item= await this._model.create({userId, contentId});
if(item) addToCacheList(String(userId), String(contentId))
// console.log({addedItem:item})
return item;
  }
  async getListItem(userId: Types.ObjectId,contentId:Types.ObjectId): Promise<IUserListItem|null> {
   const item= await this._model.findOne({userId,contentId})
   return item
   }

async removeListItem(listItemId: Types.ObjectId): Promise<IUserListItem|null> {
    const item= await this._model.findOneAndDelete({_id:listItemId})
    if(!item) return null;
if(item) removeFromCacheList(String(item.userId),String(item.contentId))
   return item
   }
   

}

