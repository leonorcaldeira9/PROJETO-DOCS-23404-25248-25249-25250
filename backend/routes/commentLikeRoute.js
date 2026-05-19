const express = require('express');
const router = express.Router();

const CommentLikeController= require('../controllers/CommentLikeController');
const authJWT = require("../middlewares/authJWT");

router.post('/create', authJWT(), CommentLikeController.addLike);

router.get('/:id', authJWT(), CommentLikeController.getLikesByComment);

router.delete('/delete/:idUser/:idComment', authJWT(), CommentLikeController.removeLike);

module.exports = router;