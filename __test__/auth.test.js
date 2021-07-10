const { app } = require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(app);

// let user = {
//   username: 'abeer', password: '1234'
// };



describe('auth test', () => {
  it('signup test', async () => {
    const res = await mockRequest.post('/api/v1/auth/signup').send({ username: 'abeer', password: '1234' })
    expect(res.status).toEqual(200)
    expect(res.body.username).toEqual('abeer')
  })

  it('signin test with basic', async () => {
    const res = await mockRequest.post('/api/v1/auth/signin').auth('abeer', '1234');
    expect(res.status).toEqual(200)
    expect(res.body.username).toEqual('abeer')
    // expect(res.header.authorization).toEqual('Basic YWJlZXI6MTIzNA==')


  })
})



describe('server test', () => {
  it('not found test', async () => {
    const response = await mockRequest.get(`/foo`);
    expect(response.status).toEqual(404);
  });

  it('error test', async () => {
    const response = await mockRequest.get('/bad');
    expect(response.status).toEqual(500);
  });
});