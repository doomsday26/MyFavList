"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const auth_1 = require("../middleware/auth");
const userRouter = (0, express_1.Router)();
userRouter.get('/:id', auth_1.isAuthenticated, (0, express_async_handler_1.default)(user_controllers_1.getUserDetails));
userRouter.post('/', (0, express_async_handler_1.default)(user_controllers_1.createUser));
//userRouter.put('/:id', asyncHandler(updateUserDetails))
exports.default = userRouter;
