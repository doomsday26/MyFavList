import mongoose from "mongoose";
import config from "./config";

export async function connectDB(): Promise<unknown> {
let uri = process.env.DEPL_TYPE=='dev' ?config.MONGO_URL:`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:27017/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`
console.log("uri>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",{uri});   
 
try {
    const con = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("connected database ");
    return con;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
