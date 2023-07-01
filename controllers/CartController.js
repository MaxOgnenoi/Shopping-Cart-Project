const Cart = require('../models/cart');
const Item = require('../models/item');

exports.addItemToCart = async (req, res) => {
    try {
        const { cartId, itemId } = req.params;
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        const isItemInCart = cart.items.some((cartItem) => cartItem.equals(item._id));
        if (isItemInCart) {
            return res.status(400).json({ message: 'Item already exists in cart' });
        }
        cart.items.push(item);
        await cart.save();
        res.status(200).json({ message: 'Item added to your cart', cart });
    } catch (error) {
        res.status(400).json({ message: 'Error adding an item', error: error.message, stack: error.stack });
    }
};

exports.removeItemFromCart = async (req, res) => {
    try {
        const { cartId, itemId } = req.params;
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        cart.items.splice(itemIndex, 1);
        await cart.save();
        res.status(200).json({ message: 'Item removed from your cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error removing an item', error });
    }
};

exports.getCart = async (req, res) => {
    try {
        const { cartId } = req.params;
        const cart = await Cart.findById(cartId).populate('items');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart', error });
    }
};
