const express = require('express');
const router = express.Router();
const authJWT = require('../middlewares/authJWT');

const { getPostById, createPost, updatePost, deletePost, getPosts,getPostsByUser } = require('../controllers/postController');

router.get('/:id', authJWT(), getPostById);
router.get('/', getPosts);
router.post('/create', authJWT(), createPost);
router.put('/update/:id', authJWT(), updatePost);
router.delete('/delete/:id', authJWT(), deletePost);
router.get('/user/:id', authJWT(), getPostsByUser);
module.exports = router;