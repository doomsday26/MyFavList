//import redis,{RedisClientOptions,RedisClientType} from 'redis';
import user from '../models/user';
import userListItem, { IUserListItem } from '../models/userListItem';
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


// export const isMemberOfCacheList = async (userId: string, contentId: string):Promise<number> => {
// const isMember = await redisClient.sismember(`user:${userId}:list`,`${contentId}`);
// return isMember;
// }

export const addToCacheList = async (userId: string,data:string):Promise<void> => {
await redisClient.setex(`${userId}`,60*60*10,data);

}

// export const removeFromCacheList=async (userId: string, contentId: string,data:string):Promise<void> => {

// console.log(userId,contentId)
// const key = `${userId}:${contentId}`;
// const result = await redisClient.del(key,data);
// console.log({result});

// }

export const updateList=async(userId:string, data:string):Promise<string> =>{
//check if there is any data in cache
// console.log('adding to the list')
let list = await redisClient.exists(userId);
if(list){
    await redisClient.del(userId);
}
return await redisClient.setex(`${userId}`, 60*60*10, data);

}

export const checkUserListCache=async(userId:string):Promise<number> =>{
return await redisClient.exists(userId);
}



export const addAllItemsToCachedList= async(userId:string,data:string):Promise<void> => {
await redisClient.set(`${userId}`,data);
}

export const getCachedUserList= async(userId:string):Promise<IUserListItem[]> => {
  let list = await redisClient.get(userId);
  // console.log({list})   
  if(!list) return [];
  else{
 const parsedList: IUserListItem[] = JSON.parse(list);
//  console.log({parsedList})
  return parsedList;
}

}

//             // Remove from Redis set
//             await this.redisClient.srem(`user:${item.userId}:list`, item.contentId.toString());

//             // Invalidate cache for user list items
//             await this.invalidateUserListCache(item.userId);
