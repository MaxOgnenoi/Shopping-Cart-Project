const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const itemController = require('../controllers/itemController');
const cartController = require('../controllers/cartController');

router.get('/users', userController.getUser);
router.post('/users', userController.createUser);
router.post('/users/login', userController.loginUser);
router.put('/users/:id', userController.auth, userController.updateUser);
router.delete('/users/:id', userController.auth, userController.deleteUser);

router.post('/users/:userId/carts/:cartId/items/:itemId', userController.auth, cartController.addItemToCart);
router.delete('/users/:userId/carts/:cartId/items/:itemId', userController.auth, cartController.removeItemFromCart);
router.get('/users/:userId/carts/:cartId', userController.auth, cartController.getCart);

router.post('/items', itemController.createItem);
router.get('/items/:itemId', itemController.getItem);

module.exports = router;
