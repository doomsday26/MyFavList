"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const process_1 = __importDefault(require("process"));
dotenv.config();
const MONGO_PASSWORD = process_1.default.env.MONGO_PASSWORD;
const MONGO_URL = `mongodb+srv://harsh:${MONGO_PASSWORD}@deployment.pwcgaeq.mongodb.net/?retryWrites=true&w=majority&appName=deployment`;
const PORT = process_1.default.env.PORT;
const PASSWORD_MIN_LENGTH = process_1.default.env.PASSWORD_MIN_LENGTH;
const DEFAULT_PAGE = process_1.default.env.DEFAULT_PAGE;
const DEFAULT_QUERY_LIMIT = process_1.default.env.DEFAULT_QUERY_LIMIT;
const DEFAULT_SORT = process_1.default.env.DEFAULT_SORT;
const REDIS_HOST = process_1.default.env.REDIS_HOST;
const REDIS_PORT = process_1.default.env.REDIS_PORT;
const REDIS_URL = process_1.default.env.REDIS_URL;
const ENV = 'dev';
exports.default = {
    MONGO_URL,
    PORT,
    PASSWORD_MIN_LENGTH,
    DEFAULT_PAGE,
    DEFAULT_QUERY_LIMIT,
    DEFAULT_SORT,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_URL,
    ENV
};
