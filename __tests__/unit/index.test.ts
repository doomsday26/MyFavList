import { JEST_TIMEOUT, closeDatabase, connectMemoryDB } from "../../src/utils/mockDb";
import ConteModel, { IContent } from "../../src/models/content";
import ContentRepository from "../../src/repository/content.repository";
import { Model, ObjectId, Types } from "mongoose";
import UserListItemRepository from "../../src/repository/userListItem.repository";
import { IUserListItem } from "../../src/models/userListItem";
import { IuserListQuery } from "../../src/utils/types";
import { title } from "process";

//jest.mock('redis', () => jest.requireActual('redis-mock'));
describe("Sample Test", () => {
  test("sample-test", () => {
    expect(2 + 2).toBe(4);
  });
});

const content_payload :IContent= {
  title: "Love in Paris",
  contentType: "Movie",
  description: "A romantic tale set in the beautiful city of Paris.",
  genres: ["Romance", "Drama"],
  releaseDate: "2024-02-14T18:30:00.000+00:00",
  episodes: [],
  director: ["Nora Ephron"],
  actors: ["Emma Stone", "Ryan Gosling"],
};


describe("content functions", () => {
    let conetntRepo= new ContentRepository();
   
  beforeAll(async () => {
    await connectMemoryDB();
  });

  afterAll(async () => {
    await closeDatabase();
  })
 it('should create content successfully',async()=>{
    const result = await conetntRepo.createContent(content_payload)
    const resultReleaseDate = new Date(result.releaseDate).toISOString();
    const expectedReleaseDate = new Date(content_payload.releaseDate).toISOString();
    expect(result).toBeDefined();
    expect(result.contentType[0]).toEqual(content_payload.contentType);
    expect(result.actors).toEqual(content_payload.actors);
    expect(result.director).toEqual(content_payload.director);
    expect(result.genres).toEqual(content_payload.genres);
    expect(result.description).toEqual(content_payload.description);
    expect(resultReleaseDate).toEqual(expectedReleaseDate);
    expect(result.episodes).toEqual(content_payload.episodes);
    expect(result.title).toEqual(content_payload.title);
    expect(result).toHaveProperty('_id')
    expect(result).toHaveProperty('createdAt')
 })

})


const listItem_payload:Record<string,Types.ObjectId> ={
    userId: new Types.ObjectId('6647004c04fa3053ea1de20e'),
    contentId: new Types.ObjectId('6647004c04fa3053ea1de20e'),
    }
describe('ListItem Functions working',()=>{
    let ListItemRepo = new UserListItemRepository()
       
  beforeAll(async () => {
    await connectMemoryDB();
  });

  afterAll(async () => {
    await closeDatabase();
  })
// afterEach(async()=>{
//      await clearDatabase();
// })

  it('should create content successfully',async()=>{

    const result = await ListItemRepo.addToUserList(listItem_payload.userId,listItem_payload.contentId,content_payload.title,content_payload.description)
    expect(result).toBeDefined();
    expect(result).toHaveProperty('_id')
    expect(result).toHaveProperty('createdAt')
    expect(result?.userId).toEqual(listItem_payload.userId)
    expect(result?.contentId).toEqual(listItem_payload.contentId)
    expect(result?.title).toEqual(content_payload.title)
    expect(result?.description).toEqual(content_payload.description)
 })

it('should delete created content',async()=>{
  const result = await ListItemRepo.addToUserList(listItem_payload.userId,listItem_payload.contentId,content_payload.title,content_payload.description)
    const deletedResult = await ListItemRepo.removeListItem(result?._id!)
    expect(deletedResult).toBeDefined();
    expect(deletedResult).toHaveProperty('_id')
    expect(deletedResult).toHaveProperty('createdAt')
    expect(deletedResult?.userId).toEqual(result?.userId)
    expect(deletedResult?.contentId).toEqual(result?.contentId)
    expect(deletedResult?.userId).toEqual(listItem_payload.userId)
    expect(deletedResult?.contentId).toEqual(listItem_payload.contentId)
})

it ('should get all the list items',async()=>{
    //since an alreadt created data is already there so we will create just one one more,so now we have two list items in the mongo database
    const resultListItem1 =await ListItemRepo.addToUserList(listItem_payload.userId,listItem_payload.contentId,content_payload.title,content_payload.description)
 //   const resultListItem2 = await ListItemRepo.addToUserList(listItem_payload.userId, new Types.ObjectId('6647004c04fa3053ea1de20e'))
    const params:IuserListQuery= {
        userId: "6647004c04fa3053ea1de20e",
        skip: 0,
        limit: 10,
        sort: 0
    } 
    const listItems = await ListItemRepo.getUserListItems(params)
    expect(listItems).toBeDefined();
    expect(listItems).toHaveLength(2)
})

})


