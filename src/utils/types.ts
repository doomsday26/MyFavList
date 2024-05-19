import { Types } from "mongoose";
import { IWatchHistoryItem } from "../models/user";

export interface AuthenticatedRequest extends Request {
    user?: {
      _id: string; // Assuming _id is a string, adjust the type if it's different
      // Include other properties of the user object if needed
    };
  }
  
export interface IuserListQuery{
userId?:String,
isFavourite?:boolean,
genre?:string
skip:number,
limit:number,
sort:number
}

export interface IUpdateUSerDetails{
  userId:String;
  username:String; 
  email:String, 
  img:{
    link: string;
    source: string;
  }, 
  phoneNumber:String;
  password:string;
}

export interface ICreateUserDetails{
  googleId:string;
  username: string;
  email: string;
  img: {
    link: string;
    source: string;
  };
  phoneNumber: string;
  password: string;
}