const express = require('express');
const router = express.Router();
const authJWT = require('../middlewares/authJWT');


const { getUserById, createUser, updateUser, deleteUser, getUsers, loginUser} = require('../controllers/userController');


router.get('/:id', authJWT(), getUserById);
router.get('/', authJWT() ,getUsers);
router.post('/create', createUser);
router.put('/update/:id', authJWT(), updateUser);
router.delete('/delete/:id', authJWT(), deleteUser);
router.post('/login', loginUser);


module.exports = router;