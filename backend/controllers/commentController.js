const CommentModel = require('../models/CommentModel');

const getCommentById = (req, res) => {
    const id = req.params.id;
    CommentModel.getCommentById(id, (err, comment) => {
        if (err) return res.status(400).send();
        return res.json(comment);
    });
};

const getCommentsByPost = (req, res) => {
    const { idPost } = req.params;
    if (idPost === undefined) return res.status(400).send();

    CommentModel.getCommentsByPost(idPost, (err, comments) => {
        if (err) return res.status(400).send();
        return res.json(comments);
    });
};

const createComment = (req, res) => {
    // parentCommentId não é obrigatório, por isso não está no IF
    if (!req.body.idPost || !req.body.idUser || !req.body.commentText) {
        return res.status(400).send();
    }

    CommentModel.createComment(req.body, (err, result) => {
        if (err) return res.status(400).send();
        return res.json("Comment created successfully.");
    });
};

const updateComment = (req, res) => {
    const id = req.params.id;

    if (id === undefined) return res.status(400).send();
    if (!req.body.commentText) return res.status(400).send();

    CommentModel.updateComment(id, req.body.commentText, (err, result) => {
        if (err) return res.status(400).send();
        return res.json("Comment updated successfully.");
    });
};

const deleteComment = (req, res) => {
    const id = req.params.id;
    if (id === undefined) return res.status(400).send();

    CommentModel.deleteComment(id, (err, result) => {
        if (err) return res.status(400).send();
        return res.json("Comment " + id + " deleted successfully.");
    });
};

module.exports = {
    getCommentById,
    getCommentsByPost,
    createComment,
    updateComment,
    deleteComment
};