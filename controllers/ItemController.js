const Item = require('../models/item');

exports.createItem = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        const newItem = new Item({
            name,
            price,
            quantity
        });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
