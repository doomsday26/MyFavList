import {Router} from 'express';
import asyncHandler  from 'express-async-handler';
import {addToList, removeFromList,getUserList} from '../controllers/userListItem.controller';
import { isAuthenticated } from '../middleware/auth';

const listItemRouter = Router();
listItemRouter.delete('/delete/:listItemId',isAuthenticated, asyncHandler(removeFromList));
listItemRouter.post('/add/:contentId',isAuthenticated,asyncHandler(addToList))
listItemRouter.get('/',isAuthenticated, asyncHandler(getUserList))

export default listItemRouter;