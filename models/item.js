const { model, Schema } = require('mongoose')

const itemSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true }
})
const Item = model('Item', itemSchema)

module.exports = Item