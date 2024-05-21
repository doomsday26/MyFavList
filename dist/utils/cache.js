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
exports.getCachedUserList = exports.addAllItemsToCachedList = exports.checkUserListCache = exports.updateList = exports.addToCacheList = void 0;
const config_1 = __importDefault(require("./config"));
const ioredis_1 = __importDefault(require("ioredis"));
const redisURL = config_1.default.REDIS_URL || "redis://localhost:6379";
// const redisHost = process.env.REDIS_HOST || 'redis';
// const redisPort = parseInt(config.REDIS_PORT, 10) || 6379;
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
// export const isMemberOfCacheList = async (userId: string, contentId: string):Promise<number> => {
// const isMember = await redisClient.sismember(`user:${userId}:list`,`${contentId}`);
// return isMember;
// }
const addToCacheList = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient.setex(`${userId}`, 60 * 60 * 10, data);
});
exports.addToCacheList = addToCacheList;
// export const removeFromCacheList=async (userId: string, contentId: string,data:string):Promise<void> => {
// console.log(userId,contentId)
// const key = `${userId}:${contentId}`;
// const result = await redisClient.del(key,data);
// console.log({result});
// }
const updateList = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    //check if there is any data in cache
    // console.log('adding to the list')
    let list = yield redisClient.exists(userId);
    if (list) {
        yield redisClient.del(userId);
    }
    return yield redisClient.setex(`${userId}`, 60 * 60 * 10, data);
});
exports.updateList = updateList;
const checkUserListCache = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield redisClient.exists(userId);
});
exports.checkUserListCache = checkUserListCache;
const addAllItemsToCachedList = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient.set(`${userId}`, data);
});
exports.addAllItemsToCachedList = addAllItemsToCachedList;
const getCachedUserList = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    let list = yield redisClient.get(userId);
    // console.log({list})   
    if (!list)
        return [];
    else {
        const parsedList = JSON.parse(list);
        //  console.log({parsedList})
        return parsedList;
    }
});
exports.getCachedUserList = getCachedUserList;
//             // Remove from Redis set
//             await this.redisClient.srem(`user:${item.userId}:list`, item.contentId.toString());
//             // Invalidate cache for user list items
//             await this.invalidateUserListCache(item.userId);
