import request from "supertest"
import app from '../../src/index';
import { closeDatabase, connectMemoryDB } from '../../src/utils/mockDb';



describe('Course and bundle Related Apis', () => {
    it('GET / check health', async () => {
        const response = await request(app).get('/health')
        expect(response.status).toBe(200);
        expect(response.text).not.toBeNull();
    });

});


describe ('get userList api',()=>{

it('GET / userList',async()=>{
    const responseList= await request(app).get('/listItem/')
    expect(responseList.status).toBe(200);
    expect(responseList.body).not.toBeNull();
    expect(Array.isArray(responseList.body)).toBe(true);

})

})


