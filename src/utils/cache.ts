//import redis,{RedisClientOptions,RedisClientType} from 'redis';
import config from './config';
import  Redis from "ioredis";
const redisURL = config.REDIS_URL || "redis://localhost:6379";
// const redisHost = process.env.REDIS_HOST || 'redis';
// const redisPort = parseInt(config.REDIS_PORT, 10) || 6379;
const redisClient = new Redis(redisURL);


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


export const isMemberOfCacheList = async (userId: string, contentId: string):Promise<number> => {
const isMember = await redisClient.sismember(`user:${userId}:list`,`${contentId}`);
return isMember;
}

export const addToCacheList = async (userId: string, contentId: string):Promise<void> => {
await redisClient.sadd(`user:${userId}:list`, `${contentId}`);

}

export const removeFromCacheList=async (userId: string, contentId: string):Promise<void> => {
await redisClient.srem(`user:${userId}:list`, `${contentId}`);

}
export const addAllItemsToCachedList= async(userId:string,contentIds:string[]):Promise<void> => {
await redisClient.sadd(`user:${userId}:list`,contentIds);
await redisClient.expire(`user:${userId}:list`, 60 *10);
}
export const getCachedUserList= async(userId:string):Promise<string[]> => {
const userList = await redisClient.smembers(`user:${userId}:list`);
return userList;
}

//             // Remove from Redis set
//             await this.redisClient.srem(`user:${item.userId}:list`, item.contentId.toString());

//             // Invalidate cache for user list items
//             await this.invalidateUserListCache(item.userId);
