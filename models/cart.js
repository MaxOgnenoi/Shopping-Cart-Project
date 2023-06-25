const { model, Schema } = require('mongoose');

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

const Cart = model('Cart', cartSchema);

module.exports = Cart;
