const express = require('express');
const router = express.Router();


const { getUserById, createUser, updateUser, deleteUser, getUsers} = require('../controllers/userController');


router.get('/:id', getUserById);
router.get('/',getUsers);
router.post('/create', createUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);


module.exports = router;