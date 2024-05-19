import * as dotenv from 'dotenv';
import process from 'process';
dotenv.config();

const MONGO_PASSWORD=process.env.MONGO_PASSWORD
const MONGO_URL=`mongodb+srv://harsh:${MONGO_PASSWORD}@deployment.pwcgaeq.mongodb.net/?retryWrites=true&w=majority&appName=deployment`;
const PORT = process.env.PORT;
const PASSWORD_MIN_LENGTH= process.env.PASSWORD_MIN_LENGTH
const DEFAULT_PAGE=process.env.DEFAULT_PAGE
const DEFAULT_QUERY_LIMIT=process.env.DEFAULT_QUERY_LIMIT
const DEFAULT_SORT=process.env.DEFAULT_SORT
const REDIS_HOST=process.env.REDIS_HOST
const REDIS_PORT=process.env.REDIS_PORT
const REDIS_URL=process.env.REDIS_URL
export default{
MONGO_URL,
PORT,
PASSWORD_MIN_LENGTH,
DEFAULT_PAGE,
DEFAULT_QUERY_LIMIT,
DEFAULT_SORT,
REDIS_HOST,
REDIS_PORT,
REDIS_URL
}