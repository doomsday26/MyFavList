import {asyncHandler}  from '../utils/asyncHandler';
import { Router } from 'express';
import {createContent,createDummyContent,getContent} from '../controllers/content.controller';
import { isAuthenticated } from '../middleware/auth';


const contentRouter= Router();

contentRouter.get('/',isAuthenticated, asyncHandler(getContent));
contentRouter.post('/', asyncHandler(createContent))
contentRouter.get('/dummy',asyncHandler(createDummyContent))
export default contentRouter