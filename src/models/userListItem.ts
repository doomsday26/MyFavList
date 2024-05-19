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
  genre:{
    type:String,
  }
},{timestamps:true})

userListItemSchema.index({ userId: 1, contentId: 1 });
export default mongoose.model<IUserListItem>('userListItem',userListItemSchema)

export interface IUserListItem extends mongoose.Document {
  userId: Types.ObjectId;
  contentId: Types.ObjectId;
  isFaovourite?:boolean;
  genre?:String
}