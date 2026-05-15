const express = require('express');
const router = express.Router();

const { getPostById, createPost, updatePost, deletePost, getPosts,getPostsByUser } = require('../controllers/postController');
const {getUsers} = require("../controllers/userController");

router.get('/:id', getPostById);
router.get('/', getPosts);
router.post('/create', createPost);
router.put('/update/:id', updatePost);
router.delete('/delete/:id', deletePost);
router.get('/user/:id', getPostsByUser);
module.exports = router;