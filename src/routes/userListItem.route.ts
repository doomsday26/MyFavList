import {Router} from 'express';
import {asyncHandler}  from '../utils/asyncHandler';
import {addToList, removeFromList,getUserList} from '../controllers/userListItem.controller';
import { isAuthenticated } from '../middleware/auth';
import {  deleteContentValidator, userListItemValidator} from '../utils/validator';

const listItemRouter = Router();
listItemRouter.delete('/:listItemId',deleteContentValidator,isAuthenticated, asyncHandler(removeFromList));
listItemRouter.post('/add/:contentId',userListItemValidator,isAuthenticated,asyncHandler(addToList))
listItemRouter.get('/',isAuthenticated, asyncHandler(getUserList))

export default listItemRouter;