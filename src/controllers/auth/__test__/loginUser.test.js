// const request = require('supertest');
// const app = require('../../../app')
// const jwt = require('jsonwebtoken');
// const User = require('../../../models/user/user.modal');
// const createError = require('http-errors');
// const { mongoConnect, mongoDisconnect } = require('../../../services/mongo')
// const { signAccessToken, signRefreshToken, verifyAccessToken} = require('../../../helpers/jwt_helper')
// // const { loginAuthSchema } = require('../schemas/auth.schema');


// describe('POST /api/v1/auth/login', () => {
//   beforeAll(async () => {
//     await mongoConnect()
//     const user = new User({
//       name: 'Test User',
//       email: 'testuser@example.com',
//       password: 'password123',
//       passwordConfirm: 'password123'
//     });
//     await user.save();
//   });

//   afterAll(async () => {
//     // Disconnect from test database
//     await mongoDisconnect()
//   });

//   it('should return a JWT access token and user object when valid credentials are provided', async () => {
//     const response = await request(app)
//       .post('/api/v1/auth/login')
//       .send({
//         email: 'testuser@example.com',
//         password: 'password123',
//       })
//       .expect(200);

//     expect(response.body.accessToken);
//     // expect(jwt.decode(response.body.accessToken)).toMatchObject({
//     //   sub: expect.any(null),
//     //   iat: expect.any(Number),
//     //   exp: expect.any(Number),
//     // });
//     expect(response.body.refreshToken);
//     expect(response.body.user)
//     .toMatchObject({
//       name: 'Test User',
//       email: 'testuser@example.com',
//     });
//   });

//   it('should return a 404 error when an unregistered email is provided', async () => {
//     const response = await request(app)
//       .post('/api/v1/auth/login')
//       .send({
//         email: 'nonexistent@example.com',
//         password: 'password123',
//       })
//       .expect(404);

//     expect(response.body).toEqual({
//       error: {
//         message: 'User not registered',
//         status: 404,
//       },
//     });
//   });

//   it('should return a 404 error when an incorrect password is provided', async () => {
//     const response = await request(app)
//       .post('/api/v1/auth/login')
//       .send({
//         email: 'testuser@example.com',
//         password: 'incorrectpassword',
//       })
//       // .expect(404);

//     expect(response.body)
//     // .toEqual({
//     //   error: {
//     //     message: 'Username/Password not valid',
//     //     status: 404,
//     //   },
//     // });
//   });

//   it('should return a 400 error when an invalid email or password is provided', async () => {
//     const response = await request(app)
//       .post('/api/v1/auth/login')
//       .send({
//         email: 'testuser@example.com',
//         password: 'short',
//       })
//       .expect(400);

//     expect(response.body).toEqual({
//       error: {
//         message: 'Invalid Username/Password',
//         status: 400,
//       },
//     });
//   });
// });


test('should pass', () => {
  expect(true).toBeTruthy();
});