import request from 'supertest';
import { app } from '../../../index.js';
import { db } from '../../../data/index.js';

beforeEach(async () => {
  await db.invites.deleteMany();
});

afterAll(async () => {
  await db.invites.deleteMany();
  await db.$disconnect();
});

describe('Invite Routes', () => {
  describe('GET /invites', () => {
    it('should return empty array when no invites exist', async () => {
      const response = await request(app).get('/invites');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
    it('should return array of invites when they exist', async () => {
      await db.invites.create({
        data: {
          name: 'Test User',
          email: 'test@example.com',
          phone: '1234567890'
        }
      });
      const response = await request(app).get('/invites');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toMatchObject({
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890'
      });
    });
  });
  describe('POST /invites', () => {
    it('should create new invite with valid data', async () => {
      const inviteData = {
        name: 'New User',
        email: 'new@example.com',
        phone: '0987654321'
      };
      const response = await request(app)
        .post('/invites')
        .send(inviteData);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Invite sent' });
      const invite = await db.invites.findFirst({
        where: { email: inviteData.email }
      });
      expect(invite).toMatchObject(inviteData);
    });
    it('should return 400 when required fields are missing', async () => {
      const response = await request(app)
        .post('/invites')
        .send({ name: 'Incomplete User' });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Missing required fields' });
    });
    it('should return 500 when duplicate email is provided', async () => {
      const inviteData = {
        name: 'Duplicate User',
        email: 'duplicate@example.com',
        phone: '1111111111'
      };
      await request(app).post('/invites').send(inviteData);
      const response = await request(app)
        .post('/invites')
        .send({
          ...inviteData,
          phone: '2222222222'
        });
      expect(response.status).toBe(500);
      expect(response.body.error).toBeTruthy();
    });
  });
}); 