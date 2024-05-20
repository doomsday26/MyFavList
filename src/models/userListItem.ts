import mongoose,{Types} from 'mongoose'

const userListItemSchema= new mongoose.Schema({
  userId: {
    type: Types.ObjectId,
    required: true
  },
  contentId: {
    type: Types.ObjectId,
    required: true
  },
  isFaovourite:{
    type:Boolean,
  },
  title:{type:String,required:true},
  description:{type:String,required:true},
  genre:{
    type:String,
  }
},{timestamps:true})

userListItemSchema.index({ userId: 1, contentId: 1 });
export default mongoose.model<IUserListItem>('userListItem',userListItemSchema)

export interface IUserListItem {
  userId: Types.ObjectId;
  contentId: Types.ObjectId;
  title:String;
  description:String;
  isFaovourite?:boolean;
  genre?:String
}