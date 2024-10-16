require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Cake = require('../models/cake.model');
const nonExistentId = new mongoose.Types.ObjectId();


beforeAll(async () => {
  await mongoose.connect(process.env.DB_URI);
});

afterEach(async () => {
  await Cake.deleteMany(); // Clean up the database after each test
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Cake API', () => {
  describe('GET /cakes', () => {
    test('should return an empty array initially', async () => {
      const res = await request(app).get('/api/cakes');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });

    test('should return all cakes after some are added', async () => {
      const newCake = new Cake({
        name: 'Chocolate Cake',
        comment: 'A delicious cake.',
        imageUrl: 'http://example.com/cake.jpg',
        yumFactor: 5
      });
      await newCake.save();

      const res = await request(app).get('/api/cakes');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].name).toBe('Chocolate Cake');
    });
  });

  describe('GET /cakes/:id', () => {
    test('should return a single cake by ID', async () => {
      const newCake = new Cake({
        name: 'Vanilla Cake',
        comment: 'A yummy vanilla cake.',
        imageUrl: 'http://example.com/vanilla.jpg',
        yumFactor: 4
      });
      const savedCake = await newCake.save();

      const res = await request(app).get(`/api/cakes/${savedCake._id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('Vanilla Cake');
    });

    test('should return 404 if cake does not exist', async () => {
      const res = await request(app).get(`/api/cakes/${nonExistentId}`);
      expect(res.statusCode).toBe(404);
    });
  });

  describe('POST /cakes', () => {
    test('should create a new cake with valid data', async () => {
      const newCake = {
        name: 'Strawberry Cake',
        comment: 'Sweet strawberry goodness!',
        imageUrl: 'http://example.com/strawberry.jpg',
        yumFactor: 5
      };

      const res = await request(app).post('/api/cakes').send(newCake);
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe('Strawberry Cake');
    });

    test('should not create a cake with missing name', async () => {
      const invalidCake = {
        comment: 'No name for this cake.',
        imageUrl: 'http://example.com/noname.jpg',
        yumFactor: 3
      };

      const res = await request(app).post('/api/cakes').send(invalidCake);
      expect(res.statusCode).toBe(500);
    });

    test('should not create a cake with a name that already exists', async () => {
      const newCake = new Cake({
        name: 'Duplicate Cake',
        comment: 'This is a unique cake.',
        imageUrl: 'http://example.com/duplicate.jpg',
        yumFactor: 4
      });
      await newCake.save();

      const duplicateCake = {
        name: 'Duplicate Cake',
        comment: 'This cake already exists!',
        imageUrl: 'http://example.com/duplicate2.jpg',
        yumFactor: 5
      };

      const res = await request(app).post('/api/cakes').send(duplicateCake);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Cake with this name already exists.');
    });
  });

  describe('PUT /cakes/:id', () => {
    test('should update an existing cake', async () => {
      const newCake = new Cake({
        name: 'Lemon Cake',
        comment: 'Tasty lemon cake.',
        imageUrl: 'http://example.com/lemon.jpg',
        yumFactor: 4
      });
      const savedCake = await newCake.save();

      const updatedData = {
        name: 'Updated Lemon Cake',
        comment: 'Even better lemon cake!',
        imageUrl: 'http://example.com/lemon.jpg',
        yumFactor: 5
      };

      const res = await request(app).put(`/api/cakes/${savedCake._id}`).send(updatedData);
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('Updated Lemon Cake');
    });

    test('should return 404 if trying to update a non-existent cake', async () => {
      const res = await request(app).put(`/api/cakes/${nonExistentId}`).send({
        name: 'Non-existent Cake',
        comment: 'This cake does not exist.',
        imageUrl: 'http://example.com/nonexistent.jpg',
        yumFactor: 3
      });
      expect(res.statusCode).toBe(404);
    });
  });

  describe('DELETE /cakes/:id', () => {
    test('should delete an existing cake', async () => {
      const newCake = new Cake({
        name: 'To Be Deleted Cake',
        comment: 'This cake will be deleted.',
        imageUrl: 'http://example.com/delete.jpg',
        yumFactor: 2
      });
      const savedCake = await newCake.save();

      const res = await request(app).delete(`/api/cakes/${savedCake._id}`);
      expect(res.statusCode).toBe(200);
    });

    test('should return 404 when trying to delete a non-existent cake', async () => {
      const res = await request(app).delete(`/api/cakes/${nonExistentId}`);
      expect(res.statusCode).toBe(404);
    });
  });
});
