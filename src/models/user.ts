import mongoose from 'mongoose';
import config from '../utils/config';

const watchHistoryItem= new mongoose.Schema({
    contentId:{
        type:String
    },
    contentType:{
        type:String
    },
    watchedOn:{
        type:Date
    },
    rating:{
        type:Number
    }   
})

export interface IWatchHistoryItem extends mongoose.Schema {
    contentId:string;
    contentType:string;
    watchedOn:Date;
    rating:number;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide your username"],
      trim: true,
      maxLength: 40,
    },
 email: {
      type: String,
      required: true,
    },
    googleId:{
      type:String
    },
    img: {
      link: {
        type: String,
      },
      source: {
        type: String,
  
      },
    },
    password: {
      type: String,
      minLength: config.PASSWORD_MIN_LENGTH,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    preferences: {
  favoriteGenres: {
    type:[String],
    default:[]
},
dislikedGenres:  {
    type:[String],
    default:[]
}
    },
    watchHistory:{
        type:[watchHistoryItem],
        default:[]
    },
    myWatchList:{
        type:[mongoose.SchemaTypes.ObjectId],
        default:[]
        }
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });

export interface IUser extends mongoose.Schema {
  _id: string;
  googleId:string;
  username: string;
  email: string;
  img: {
    link: string;
    source: string;
  };
  phoneNumber: string;
  password: string;
  preferences:{
    favoriteGenres:String[];
    dislikedGenres:String[];
  },
  watchHistory:IWatchHistoryItem[]
}
export default mongoose.model<IUser>('User', userSchema);


