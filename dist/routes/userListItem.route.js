"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userListItem_controller_1 = require("../controllers/userListItem.controller");
const auth_1 = require("../middleware/auth");
const listItemRouter = (0, express_1.Router)();
listItemRouter.delete('/delete/:listItemId', auth_1.isAuthenticated, (0, express_async_handler_1.default)(userListItem_controller_1.removeFromList));
listItemRouter.post('/add/:contentId', auth_1.isAuthenticated, (0, express_async_handler_1.default)(userListItem_controller_1.addToList));
listItemRouter.get('/', auth_1.isAuthenticated, (0, express_async_handler_1.default)(userListItem_controller_1.getUserList));
exports.default = listItemRouter;
