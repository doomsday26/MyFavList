"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const userListItem_repository_1 = __importDefault(require("../repository/userListItem.repository"));
const mongoose_1 = require("mongoose");
const error_1 = require("../utils/error");
const cache_1 = require("../utils/cache");
class UserService {
    constructor(UserListRepository) {
        this.UserListRepository = UserListRepository;
    }
    getUsersList(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, isFavourite, genre, skip, limit, sort } = query;
            //check if cached
            let checkCached = yield (0, cache_1.checkUserListCache)(String(userId));
            // console.log({checkCached})
            if (checkCached) {
                return yield (0, cache_1.getCachedUserList)(String(userId));
            }
            else {
                const response = yield this.UserListRepository.getUserListItems({ userId, isFavourite, genre, skip, limit, sort });
                // console.log(response)
                if (!(response === null || response === void 0 ? void 0 : response.length))
                    throw new Error('no content found');
                yield (0, cache_1.addAllItemsToCachedList)(String(userId), JSON.stringify(response));
                return response;
            }
        });
    }
    ;
    deleteUserListItem(userId, listItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.UserListRepository.removeListItem(new mongoose_1.Types.ObjectId(String(listItemId)));
            if (!response)
                throw new Error('item not found');
            const newList = yield this.UserListRepository.getUserListItems({ userId, isFavourite: undefined, genre: undefined, skip: 0, limit: 10, sort: 1 });
            yield (0, cache_1.updateList)(userId, JSON.stringify(newList));
            return newList;
        });
    }
    addUserListItem(listItemData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, contentId, title, description } = listItemData;
            if (!userId || !contentId || !description || !title)
                throw new error_1.BadRequestError('invalid data or some field sare missing');
            const item = yield this.UserListRepository.getListItem(new mongoose_1.Types.ObjectId(String(userId)), new mongoose_1.Types.ObjectId(String(contentId)));
            if (item)
                throw new error_1.BadRequestError('item already present');
            const listItem = yield this.UserListRepository.addToUserList(new mongoose_1.Types.ObjectId(String(userId)), new mongoose_1.Types.ObjectId(String(contentId)), title, description);
            if (!listItem)
                throw new error_1.InternalError('error occured');
            const newList = yield this.UserListRepository.getUserListItems({ userId: String(userId), isFavourite: undefined, genre: undefined, skip: 0, limit: 10, sort: 1 });
            let updated = yield (0, cache_1.updateList)(String(userId), JSON.stringify(newList));
            // console.log(updated)
            return newList;
        });
    }
}
exports.UserService = UserService;
exports.default = new UserService(new userListItem_repository_1.default());
