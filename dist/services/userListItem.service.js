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
class UserService {
    constructor(UserListRepository) {
        this.UserListRepository = UserListRepository;
    }
    getUsersList(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, isFavourite, genre, skip, limit, sort } = query;
            const response = yield this.UserListRepository.getUserListItems({ userId, isFavourite, genre, skip, limit, sort });
            return response;
        });
    }
    ;
    deleteUserListItem(listItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.UserListRepository.removeListItem(new mongoose_1.Types.ObjectId(String(listItemId)));
            if (!response)
                throw new Error('item not found');
            return response;
        });
    }
    addUserListItem(userId, contentId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId || !contentId)
                throw new Error('userId and contentId are required');
            const item = yield this.UserListRepository.getListItem(new mongoose_1.Types.ObjectId(String(userId)), new mongoose_1.Types.ObjectId(String(contentId)));
            if (item)
                throw new Error('item already exists in the list');
            const response = yield this.UserListRepository.addToUserList(new mongoose_1.Types.ObjectId(String(userId)), new mongoose_1.Types.ObjectId(String(contentId)));
            return response;
        });
    }
}
exports.UserService = UserService;
exports.default = new UserService(new userListItem_repository_1.default());
