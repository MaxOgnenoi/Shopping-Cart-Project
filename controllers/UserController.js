require('dotenv').config()
const User = require('../models/user');
const Cart = require('../models/cart')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: data._id });
        if (!user) {
            throw new Error('Bad credentials');
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const cart = new Cart({ user: user._id });
        await cart.save();

        if (!user) {
            throw new Error('Failed to create user');
        }

        user.carts = [cart._id]; 
        await user.save();
        const token = await user.generateAuthToken();
        res.json({ user, token });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            throw new Error('Invalid login credentials');
        }
        const token = await user.generateAuthToken();
        res.json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        updates.forEach((update) => (req.user[update] = req.body[update]));
        await req.user.save();
        res.json(req.user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await req.user.deleteOne();
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
