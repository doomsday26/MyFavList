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
exports.getCachedUserList = exports.addAllItemsToCachedList = exports.removeFromCacheList = exports.addToCacheList = exports.isMemberOfCacheList = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const redisURL = process.env.REDIS_URL || "redis://localhost:6379";
const redisClient = new ioredis_1.default(redisURL);
// Redis client options
// const redisOptions :RedisClientOptions= {
//   host: config.REDIS_HOST||'localhost',
//   port: parseInt(config.REDIS_PORT || '6379'),
//   retry_strategy: () => 1000, // Retry strategy in case of connection failure
// };
// Create Redis client
// const redisClient:RedisClientType = redis.createClient();
// Handle Redis client events
redisClient.on('error', (err) => {
    console.error('Redis client error:', err);
});
const isMemberOfCacheList = (userId, contentId) => __awaiter(void 0, void 0, void 0, function* () {
    const isMember = yield redisClient.sismember(`user:${userId}:list`, `${contentId}`);
    return isMember;
});
exports.isMemberOfCacheList = isMemberOfCacheList;
const addToCacheList = (userId, contentId) => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient.sadd(`user:${userId}:list`, `${contentId}`);
});
exports.addToCacheList = addToCacheList;
const removeFromCacheList = (userId, contentId) => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient.srem(`user:${userId}:list`, `${contentId}`);
});
exports.removeFromCacheList = removeFromCacheList;
const addAllItemsToCachedList = (userId, contentIds) => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient.sadd(`user:${userId}:list`, contentIds);
    yield redisClient.expire(`user:${userId}:list`, 60 * 10);
});
exports.addAllItemsToCachedList = addAllItemsToCachedList;
const getCachedUserList = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userList = yield redisClient.smembers(`user:${userId}:list`);
    return userList;
});
exports.getCachedUserList = getCachedUserList;
//             // Remove from Redis set
//             await this.redisClient.srem(`user:${item.userId}:list`, item.contentId.toString());
//             // Invalidate cache for user list items
//             await this.invalidateUserListCache(item.userId);
