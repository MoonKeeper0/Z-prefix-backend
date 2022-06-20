const request = require('supertest');
const app = require('./app');

describe('GET /api/rooms', () => {
  test('should return a JSON object with a room detail', (done) => {
    request(app)
      .get('/api/rooms/1')
      .expect('Content-Type', /json/)
      .expect(200, {
        id: 1,
        bldg: 8175,
        room: 'Orange',
        phone: '',
        capacity: 24
      })
      .end( (err, res) => {
        if (err) throw err;
        done();
      })
  })
})

describe('POST /api/rooms', () => {
  test('should return a JSON object with details of the room that was posted', (done) => {
    request(app)
      .post('/api/rooms')
      .expect('Content-Type', /json/)
      .expect(200, {
        id: 1,
        bldg: 8175,
        room: 'Orange',
        phone: '',
        capacity: 24
      })
      .end( (err, res) => {
        if (err) throw err;
        done();
      })
  })
})