const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const ItemController = require('../controllers/ItemController');
const CartController = require('../controllers/CartController');

router.get('/', UserController.getUser);
router.post('/', UserController.createUser);
router.post('/login', UserController.loginUser);
router.put('/:id', UserController.auth, UserController.updateUser);
router.delete('/:id', UserController.auth, UserController.deleteUser);

router.post('/carts/:cartId/items/:itemId', CartController.addItemToCart);
router.delete('/carts/:cartId/items/:itemId', CartController.removeItemFromCart);
router.get('/carts/:cartId', CartController.getCart);

router.post('/items', ItemController.createItem);
router.get('/items/:itemId', ItemController.getItem);

module.exports = router;
