const express = require('express');
const router = express.Router();

const { addLike, removeLike, getLikesByPost, getPostLikesByUser, getUsersLikePost} = require('../controllers/postLikeController');

router.post('/add', addLike);

router.delete('/delete/:idUser/:idPost', removeLike);

router.get('/count/:id', getLikesByPost);

router.get('/user/:id', getPostLikesByUser);

router.get('/usersLikePost/:id', getUsersLikePost);

module.exports = router;