import { NextFunction,Request,Response } from "express";
import { authenticatedRequest } from "./userListItem.controller";
import ContentService  from "../services/content.service"; 
import { IContent } from "../models/content";
import {data} from '../utils/dummyContent'


export const getContent=async(req:authenticatedRequest,res:Response,next:NextFunction):Promise<void>=>{
console.log(req.user);
console.log('inside the content controller')
    let contentDetails= await ContentService.getAllContent()
    res.status(200).json(contentDetails);
   // next(contentDetails)
}
export const createContent=async(req:Request,res:Response, next:NextFunction):Promise<void>=>{
    // console.log(req.body);
    const { title,contentType,description,genres,releaseDate,episodes,director,actors } = req.body
const content:IContent={ title,contentType,description,genres,releaseDate,episodes,director,actors};

    let contentDetails= await ContentService.createContent(content)
    next(contentDetails)
}

export const createDummyContent=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
  try {
    let contentData= data;
    let arr:any[]=[];
    for(let i=0;i<contentData.length;i++){
 arr.push( ContentService.createContent(contentData[i]))
    }
    await Promise.all(arr).then(data=>{console.log(data.length)})
     res.status(200).json({msg:'dummy content created'})
     return
  } catch (error) {
    console.log(error)
  }
 
}