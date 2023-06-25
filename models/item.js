const { model, Schema } = require('mongoose');

const itemSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }
});

const Item = model('Item', itemSchema);

module.exports = Item;
