const { app } = require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(app);



// describe('auth test', ()=>{
//   it('signup test', async ()=>{

//   })

//   it('signin test', async ()=>{

//   })
// })


describe('server test', () => {
  it('not found test', async () => {
    const response = await request.get(`/foo`);
    expect(response.status).toEqual(404);
  });

  it('error test', async () => {
    const response = await request.put('/bad');
    expect(response.status).toEqual(500);
  });
});