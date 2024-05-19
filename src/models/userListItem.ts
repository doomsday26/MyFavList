import mongoose,{Types} from 'mongoose'

const userListItem= new mongoose.Schema({
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


export default mongoose.model<IUserListItem>('userListItem',userListItem)

export interface IUserListItem extends mongoose.Document {
  userId: Types.ObjectId;
  contentId: Types.ObjectId;
  isFaovourite?:boolean;
  genre?:String
}