const supertest=require("supertest");

const {baseUrl}=require('./base');


let request=supertest(baseUrl);

describe('main',async function(){
  it('GET / 200',async function(){
    await request.get('/').expect(200)
  })
})




