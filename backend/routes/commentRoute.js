const express = require('express');
const router = express.Router();

const CommentController = require('../controllers/CommentController');

router.post('/create', CommentController.createComment);

router.get('/:id', CommentController.getCommentById);

router.get('/post/:idPost', CommentController.getCommentsByPost);

router.put('/update/:id', CommentController.updateComment);

router.delete('/delete/:id', CommentController.deleteComment);

module.exports = router;