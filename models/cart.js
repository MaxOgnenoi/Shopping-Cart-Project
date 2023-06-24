const { model, Schema } = require('mongoose')

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjestId, required: true, ref: 'User' }
})
const Cart = model('Cart', cartSchema)

module.exports = Cart