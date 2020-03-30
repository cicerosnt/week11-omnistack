const request = require('supertest');
const app =require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', ()=>{
  beforeEach(async() => {
    //await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async()=>{
    await connection.destroy();
  });

  it('Should be able to create a new ONG', async () => {
    const response = await request(app)
    .post('/ongs')
    //.set('Authorization', 'IdOng')
    .send({
      name: "apae 3",
      email: "contato@teste.com",
      whatsapp: "17997693242",
      city: "Catanduva",
      uf: "SP"
    })
    
    console.log(response.body);

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);

  });

})