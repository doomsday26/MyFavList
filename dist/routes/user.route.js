"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler_1 = require("../utils/asyncHandler");
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const auth_1 = require("../middleware/auth");
const userRouter = (0, express_1.Router)();
userRouter.get('/:id', auth_1.isAuthenticated, (0, asyncHandler_1.asyncHandler)(user_controllers_1.getUserDetails));
userRouter.post('/', (0, asyncHandler_1.asyncHandler)(user_controllers_1.createUser));
//userRouter.put('/:id', asyncHandler(updateUserDetails))
exports.default = userRouter;
