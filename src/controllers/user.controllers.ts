import { NextFunction,Request,Response } from "express";
import { authenticatedRequest } from "./userListItem.controller";
import UserService from "../services/user.service";



export const getUserDetails=async(req:authenticatedRequest,res:Response,next:NextFunction):Promise<void>=>{
    const userId = String(req?.user?._id);
    let userDetails= await UserService.getuserDetails(userId)
    next(userDetails)
}
export const createUser=async(req:Request,res:Response, next:NextFunction):Promise<void>=>{
    // console.log(req.body);
    const { username,email,img,googleId,phoneNumber,password} = req.body

    let userDetails= await UserService.createUser({username, email, img, googleId, phoneNumber, password})
    next(userDetails)
}

// export const updateUserDetails= async(req:authenticatedRequest,res:Response,next:NextFunction):Promise<void>=>{
//     const userId = String(req?.user?._id);
//     const { name,email,img,googleId,phoneNumber,password} = req.body

//     let userDetails= await UserService.updateUserDetails({userId,username, email, img, phoneNumber, password})
//     next(userDetails)
// }