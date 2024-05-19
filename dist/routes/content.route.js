"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const express_1 = require("express");
const content_controller_1 = require("../controllers/content.controller");
const auth_1 = require("../middleware/auth");
const contentRouter = (0, express_1.Router)();
contentRouter.get('/', auth_1.isAuthenticated, (0, express_async_handler_1.default)(content_controller_1.getContent));
contentRouter.post('/', (0, express_async_handler_1.default)(content_controller_1.createContent));
contentRouter.get('/dummy', (0, express_async_handler_1.default)(content_controller_1.createDummyContent));
exports.default = contentRouter;
