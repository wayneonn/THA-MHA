// Import required packages
const request = require('supertest');
const fs = require('fs');
const app = require('./backend.js');

describe('Backend API Tests', () => {
  beforeAll(() => {
    // Initialize or reset the data.json file before testing
    fs.writeFileSync('data.json', JSON.stringify([], null, 2));
  });

  // Test GET /object/:id
  it('should return 404 for a non-existent object', async () => {
    const res = await request(app).get('/object/999');
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe('Object not found');
  });

  // Test POST /object
  it('should create a new object', async () => {
    const res = await request(app)
      .post('/object')
      .send({ name: 'John Doe', email: 'john.doe@example.com' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('John Doe');
    expect(res.body.email).toBe('john.doe@example.com');
  });

  // Test GET /object/:id after POST
  it('should return the created object', async () => {
    const res = await request(app).get('/object/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('John Doe');
    expect(res.body.email).toBe('john.doe@example.com');
  });

  // Test DELETE /object/:id
  it('should delete an existing object', async () => {
    const res = await request(app).delete('/object/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body[0].id).toBe(1);
  });

  // Test GET /object/:id after DELETE
  it('should return 404 for a deleted object', async () => {
    const res = await request(app).get('/object/1');
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe('Object not found');
  });
});

module.exports = {};