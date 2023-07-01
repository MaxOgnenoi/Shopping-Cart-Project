const request = require('supertest');
const app = require('../app');
const Cart = require('../models/cart');
const Item = require('../models/item');
const User = require('../models/user');
const mongoose = require('mongoose');

describe('Cart Controller', () => {
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
        await Cart.deleteMany();
        await Item.deleteMany();
        await User.deleteMany();
    });

    describe('POST /carts/:cartId/items/:itemId', () => {
        it('should add an item to the cart', async () => {
            const user = await User.create({
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                carts: []
            });
            
            const cart = await Cart.create({
                user: user._id,
                items: [],
            });
            const item = await Item.create({
                name: 'Item 1',
                price: 10,
                quantity: 1,
            });

            

            const response = await request(app)
                .post(`/carts/${cart._id}/items/${item._id}`)
                .expect(200);

            expect(response.body).toBeDefined();
            expect(response.body.message).toBe('Item added to your cart');
            expect(response.body.cart).toBeDefined();
            expect(response.body.cart._id).toBe(cart._id.toString());
            expect(response.body.cart.items.length).toBe(1);
            expect(response.body.cart.items[0]._id).toBe(item._id.toString());
        });


    });

    describe('DELETE /carts/:cartId/items/:itemId', () => {
        it('should remove an item from the cart', async () => {
            const user = await User.create({
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password123',
            });

            const item = await Item.create({
                name: 'Item 1',
                price: 10,
                quantity: 5,
            });

            const cart = await Cart.create({
                user: user._id,
                items: [item._id],
            });

            const response = await request(app)
                .delete(`/carts/${cart._id}/items/${item._id}`)
                .expect(200);

            expect(response.body).toBeDefined();
            expect(response.body.message).toBe('Item removed from your cart');
            expect(response.body.cart).toBeDefined();
            expect(response.body.cart._id).toBe(cart._id.toString());
            expect(response.body.cart.items.length).toBe(0);
        });


    });

    describe('GET /carts/:cartId', () => {
        it('should get the cart with populated items', async () => {
            const user = await User.create({
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password123',
            });

            const item1 = await Item.create({
                name: 'Item 1',
                price: 10,
                quantity: 5,
            });

            const item2 = await Item.create({
                name: 'Item 2',
                price: 20,
                quantity: 3,
            });

            const cart = await Cart.create({
                user: user._id,
                items: [item1._id, item2._id],
            });

            const response = await request(app)
                .get(`/carts/${cart._id}`)
                .expect(200);

            expect(response.body).toBeDefined();
            expect(response.body._id).toBe(cart._id.toString());
            expect(response.body.items.length).toBe(2);
            expect(response.body.items[0]._id).toBe(item1._id.toString());
            expect(response.body.items[1]._id).toBe(item2._id.toString());
        });


    });
});
