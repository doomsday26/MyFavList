import { IContent } from '../models/content';
import ContentRepository from '../repository/content.repository';
import { error } from 'console';

export class UserService {

constructor(private readonly ContentRepository: ContentRepository) { }

async getAllContent():Promise<IContent[]>{
let content= await this.ContentRepository.getAll();
// console.log({content})
if(!content.length){throw error('content not found')}
return content
};


// async updateContent(userProfileDetails:IUpdateUSerDetails){
//    const {username,email,password,img,phoneNumber}= userProfileDetails;
//    return this.UserRepository.updateUserProfile(userProfileDetails);
// };

async createContent(contentDetails:IContent):Promise<IContent>{
    return this.ContentRepository.createContent(contentDetails);
}

}

export default new UserService(new ContentRepository());