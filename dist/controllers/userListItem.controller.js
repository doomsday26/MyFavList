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
exports.removeFromList = exports.addToList = exports.getUserList = void 0;
const userListItem_service_1 = __importDefault(require("../services/userListItem.service"));
const config_1 = __importDefault(require("../utils/config"));
const mongoose_1 = require("mongoose");
const { DEFAULT_PAGE, DEFAULT_QUERY_LIMIT, DEFAULT_SORT } = config_1.default;
const getUserList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const page = req.query.page ? Number(req.query.page) : DEFAULT_PAGE;
    const limit = Number(req.query.limit ? Number(req.query.limit) : DEFAULT_QUERY_LIMIT);
    const sort = Number(req.query.sort ? Number(req.query.sort) : DEFAULT_SORT);
    const skip = Number((Number(page) - 1) * Number(limit));
    const genre = (_a = req.body) === null || _a === void 0 ? void 0 : _a.genre;
    const isFavourite = (_b = req.body) === null || _b === void 0 ? void 0 : _b.isFavourite;
    const userId = String((_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c._id);
    // const contentId = String(req.params.contentId);
    // console.log({userId,isFavourite,genre,skip,limit,sort})
    const response = yield userListItem_service_1.default.getUsersList({ userId, isFavourite, genre, skip, limit, sort });
    if (!(response === null || response === void 0 ? void 0 : response.length))
        res.status(404).json({ message: 'no content found' });
    return res.status(200).json(response);
});
exports.getUserList = getUserList;
const addToList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const userId = new mongoose_1.Types.ObjectId(String((_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d._id));
    const contentId = new mongoose_1.Types.ObjectId(req.params.contentId);
    const { title, description } = req.body;
    // console.log({userId, contentId})
    const ItemData = { userId: userId, contentId: contentId, title: String(title), description: String(description) };
    const updatedList = yield userListItem_service_1.default.addUserListItem(ItemData);
    return res.status(200).json({ message: 'successsfully added in the list', success: true, updatedList });
});
exports.addToList = addToList;
const removeFromList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const listItemId = String(req.params.listItemId);
    const response = yield userListItem_service_1.default.deleteUserListItem(String((_e = req.user) === null || _e === void 0 ? void 0 : _e._id), listItemId);
    return res.status(200).json({ message: 'successsfully removed from the list', success: true, newList: response });
});
exports.removeFromList = removeFromList;
