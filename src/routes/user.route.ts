 import {asyncHandler}  from '../utils/asyncHandler';
import { Router } from 'express';
import { createUser, getUserDetails,} from '../controllers/user.controllers';
import { isAuthenticated } from '../middleware/auth';


const userRouter= Router();

userRouter.get('/:id',isAuthenticated, asyncHandler(getUserDetails));
userRouter.post('/', asyncHandler(createUser))
//userRouter.put('/:id', asyncHandler(updateUserDetails))

export default userRouter