import { Request,Response,NextFunction } from "express"
import userListItemService from "../services/userListItem.service"
import config from "../utils/config";
import { ObjectId } from "mongoose";
const {DEFAULT_PAGE,DEFAULT_QUERY_LIMIT,DEFAULT_SORT}=config
export interface authenticatedRequest extends Request {
   user?: {
    _id: String;
   };
  }


export const getUserList=async (req:authenticatedRequest,res:Response,next:NextFunction)=>{
    const page = req.query.page ? Number(req.query.page) : DEFAULT_PAGE;
    const limit =Number( req.query.limit ? Number(req.query.limit) : DEFAULT_QUERY_LIMIT);
    const sort = Number(req.query.sort ? Number(req.query.sort) : DEFAULT_SORT);
    const skip = Number((Number(page) - 1) * Number(limit))
    const genre=req.body?.genre;
    const isFavourite= req.body?.isFavourite;
    const userId = String(req?.user?._id);
// const contentId = String(req.params.contentId);
console.log({userId,isFavourite,genre,skip,limit,sort})
const response = await userListItemService.getUsersList({userId,isFavourite,genre,skip,limit,sort});
if(!response?.length) res.status(404).json({message:'no content found'});
 res.status(200).json(response);
}
    
export const addToList=async(req:authenticatedRequest, res:Response, next:NextFunction)=>{
    const userId = String(req?.user?._id);
    const contentId = String(req.params.contentId);
    console.log({userId, contentId})
    const response = await userListItemService.addUserListItem (userId, contentId);
    res.status(200).json({message:'successsfully added in the list',success:true});
}

export const removeFromList= async(req:authenticatedRequest, res:Response, next:NextFunction)=>{
    const listItemId = String(req.params.listItemId);
    const response = await userListItemService.deleteUserListItem(listItemId);
res.status(200).json({message:'successsfully removed from the list',success:true});
}