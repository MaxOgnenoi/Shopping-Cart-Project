const request = require('supertest');
const app = require('../app');
const User = require('../models/user');
const Cart = require('../models/cart');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

describe('User Controller', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    beforeEach(async () => {
        await User.deleteMany();
        await Cart.deleteMany();
    });

    describe('POST /users', () => {
        it('should create a new user', async () => {
            const user = {
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'password123',
            };

            const response = await request(app)
                .post('/users')
                .send(user)
                .expect(200);

            expect(response.body).toBeDefined();
            expect(response.body.user).toBeDefined();
            expect(response.body.token).toBeDefined();
            expect(response.body.user.name).toBe(user.name);
            expect(response.body.user.email).toBe(user.email);
        });
    });

    describe('GET /users', () => {
        it('should get all users', async () => {
            await User.create([
                { name: 'User 1', email: 'user1@example.com', password: 'password' },
                { name: 'User 2', email: 'user2@example.com', password: 'password' }
            ]);

            const response = await request(app)
                .get('/users')
                .expect(200);

            const sortedResponse = response.body.sort((a, b) => a._id.localeCompare(b._id));
            expect(sortedResponse).toHaveLength(2);
            expect(sortedResponse[0]).toHaveProperty('_id');
            expect(sortedResponse[0].name).toBe('User 1');
            expect(sortedResponse[0].email).toBe('user1@example.com');
            expect(sortedResponse[1]).toHaveProperty('_id');
            expect(sortedResponse[1].name).toBe('User 2');
            expect(sortedResponse[1].email).toBe('user2@example.com');
        });
    });

    describe('POST /users/login', () => {
        it('should log in a user', async () => {
            const password = await bcrypt.hash('password', 8);
            const user = await User.create({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password'
            });

            const response = await request(app)
                .post('/users/login')
                .send({ email: 'john@example.com', password: 'password' })
                .expect(200);

            expect(response.body).toHaveProperty('user');
            expect(response.body).toHaveProperty('token');
            expect(response.body.user._id).toBe(user._id.toString());
            expect(response.body.user.name).toBe('John Doe');
            expect(response.body.user.email).toBe('john@example.com');
        });
    });

    describe('PUT /users/:id', () => {
        it('should update the current user', async () => {
            const password = await bcrypt.hash('password', 8);
            const user = await User.create({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password'
            });
            const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
            const response = await request(app)
                .put(`/users/${user._id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ name: 'Updated User' })
                .expect(200);
            expect(response.body).toHaveProperty('_id');
            expect(response.body.name).toBe('Updated User');
            expect(response.body.email).toBe('john@example.com');
        });
    });

    describe('DELETE /users/:id', () => {
        it('should delete the current user',
            async () => {
                const password = await bcrypt.hash('password', 8);
                const user = await User.create({
                    name: 'John Doe',
                    email: 'john@example.com',
                    password: 'password'
                });
                const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
                const response = await request(app)
                    .delete(`/users/${user._id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .expect(204);

                const deletedUser = await User.findById(user._id);
                expect(deletedUser).toBeNull();
            })
    })
})
