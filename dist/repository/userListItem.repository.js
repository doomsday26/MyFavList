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
const userListItem_1 = __importDefault(require("../models/userListItem"));
const mongoose_1 = require("mongoose");
const cache_1 = require("../utils/cache");
class UserListItemRepository {
    constructor() {
        this._model = userListItem_1.default;
    }
    getUserListItems(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, isFavourite, genre, skip, limit, sort } = params;
            let query = { userId: new mongoose_1.Types.ObjectId(String(userId)) };
            if (isFavourite !== undefined)
                query["isFavourite"] = isFavourite;
            if (genre)
                query["genre"] = genre;
            const userListItems = yield this._model.aggregate([
                { $match: { userId: new mongoose_1.Types.ObjectId(String(userId)) } },
                { $sort: { created_at: 1 } }, // Sort by _id in descending order
                { $skip: skip }, // Skip 0 documents (start from the beginning)
                { $limit: limit }, // Limit the result to 10 documents
                { $group: { _id: null, contentIds: { $push: "$contentId" } } },
                { $project: { _id: 1, contentIds: 1 } },
            ]);
            const contentIds = userListItems[0].contentIds.map((e) => String(e));
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            console.log(contentIds);
            yield (0, cache_1.addAllItemsToCachedList)(String(userId), contentIds);
            // const userListItems = await this._model.find(query,{contentId:1})
            //     .skip(skip)
            //     .limit(limit)
            //     .sort({ "created_at": 1 });
            // console.log(userListItems[0].contentIds)
            // await addAllItemsToCachedList(String(userId), userListItems)
            return contentIds;
        });
    }
    addToUserList(userId, contentId) {
        return __awaiter(this, void 0, void 0, function* () {
            let item = yield this._model.create({ userId, contentId });
            if (item)
                (0, cache_1.addToCacheList)(String(userId), String(contentId));
            // console.log({addedItem:item})
            return item;
        });
    }
    getListItem(userId, contentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this._model.findOne({ userId, contentId });
            return item;
        });
    }
    removeListItem(listItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this._model.findOneAndDelete({ _id: listItemId });
            if (!item)
                return null;
            if (item)
                (0, cache_1.removeFromCacheList)(String(item.userId), String(item.contentId));
            return item;
        });
    }
}
exports.default = UserListItemRepository;
