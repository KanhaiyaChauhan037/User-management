const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.getAllUsers);

router.post('/', usersController.createUser);

router.get('/:user_id', usersController.getUserById);

router.put('/:user_id', usersController.updateUser);

router.delete('/:user_id', usersController.deleteUser);

module.exports = router;
