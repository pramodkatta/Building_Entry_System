import request from 'supertest';
import { app } from '../app';
import mongoose from 'mongoose';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/buildingEntrySystemTest');
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Event Controller', () => {
  it('should register an entry', async () => {
    const res = await request(app).post('/api/entry').send({ personId: '1', gate: 'A' });
    expect(res.status).toBe(201);
  });

  it('should register an exit', async () => {
    const res = await request(app).post('/api/exit').send({ personId: '1', gate: 'B' });
    expect(res.status).toBe(201);
  });

  it('should get people inside', async () => {
    const res = await request(app).get('/api/people');
    expect(res.status).toBe(200);
  });

  it('should get analytics', async () => {
    const res = await request(app).get('/api/analytics');
    expect(res.status).toBe(200);
  });
});
