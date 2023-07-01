const request = require('supertest');
const app = require('../app');
const Item = require('../models/item');
const mongoose = require('mongoose');


describe('Item Controller', () => {
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
        await Item.deleteMany();
    });

    describe('POST /items', () => {
        it('should create a new item', async () => {
            const item = {
                name: 'Item 1',
                price: 10,
                quantity: 5
            };

            const response = await request(app)
                .post('/items')
                .send(item)
                .expect(201);

            expect(response.body).toBeDefined();
            expect(response.body.name).toBe(item.name);
            expect(response.body.price).toBe(item.price);
            expect(response.body.quantity).toBe(item.quantity);
        });
    });

    describe('GET /items/:itemId', () => {
        it('should get an item by ID', async () => {
            const newItem = new Item({
                name: 'Item 1',
                price: 10,
                quantity: 5
            });
            await newItem.save();

            const response = await request(app)
                .get(`/items/${newItem._id}`)
                .expect(200);

            expect(response.body).toBeDefined();
            expect(response.body._id).toBe(newItem._id.toString());
            expect(response.body.name).toBe(newItem.name);
            expect(response.body.price).toBe(newItem.price);
            expect(response.body.quantity).toBe(newItem.quantity);
        });


    });
});
