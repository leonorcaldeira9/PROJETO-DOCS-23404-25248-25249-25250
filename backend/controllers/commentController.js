const CommentModel = require('../models/CommentModel');

const getCommentById = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ error: "Comment ID is required." });
    }

    CommentModel.getCommentById(id, (err, comment) => {
        if (err) {
            return res.status(500).json({ error: "Error searching for the comment." });
        }

        if (comment.length === 0) {
            return res.status(404).json({ error: "Comment not found." });
        }

        return res.status(200).json(comment[0]);
    });
};

const getCommentsByPost = (req, res) => {
    const { idPost } = req.params;
    //if (idPost === undefined) return res.status(400).send();

    if (!idPost) {
        return res.status(400).json({ error: "Post ID is required." });
    }

    CommentModel.getCommentsByPost(idPost, (err, comments) => {
        if (err) {
            return res.status(500).json({ error: "Error searching for comments." });
        }

        return res.status(200).json(comments);
    });
};

const createComment = (req, res) => {
    /*if (!req.body.idPost || !req.body.idUser || !req.body.commentText) {
        return res.status(400).send();
    }*/

    const idUser = req.user.id;
    const { idPost, commentText, parentCommentId} = req.body;

    if (!idPost || !commentText) {
        return res.status(400).json({ error: "The post ID and comment text are required." });
    }

    const commentData = {
        idPost: idPost,
        idUser: idUser,
        commentText: commentText,
        parentCommentId: parentCommentId || null
    };

    CommentModel.createComment(commentData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error creating comment. Check if the post exists." });
        }
        return res.status(201).json({ message: "Comment created successfully." });
    });
};

const updateComment = (req, res) => {
    /*const id = req.params.id;

    if (id === undefined) return res.status(400).send();
    if (!req.body.commentText) return res.status(400).send();*/

    const idComment = req.params.id;
    const { commentText } = req.body;
    const loggedInUserId = req.user.id;

    if (!idComment || !commentText) {
        return res.status(400).json({ error: "The comment ID and the new text are required." });
    }

    CommentModel.getCommentById(idComment, (err, comment) => {
        if (err) {
            return res.status(500).json({ error: "Error verifying comment." });
        }

        if (comment.length === 0) {
            return res.status(404).json({ error: "Comment not found." });
        }

        if (comment[0].idUser !== loggedInUserId) {
            return res.status(403).json({ error: "You do not have permission to update this comment." });
        }

        CommentModel.updateComment(idComment, commentText, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error updating the comment." });
            }
            return res.status(200).json({ message: "Comment updated successfully." });
        });
    });
};

const deleteComment = (req, res) => {
    /*const id = req.params.id;
    if (id === undefined) return res.status(400).send();*/

    const idComment = req.params.id;
    const loggedInUserId = req.user.id;

    if (!idComment) {
        return res.status(400).json({ error: "The comment ID is required." });
    }

    CommentModel.getCommentById(idComment, (err, comment) => {
        if (err) {
            return res.status(500).json({error: "Error verifying comment."});
        }

        if (comment.length === 0) {
            return res.status(404).json({error: "Comment not found."});
        }

        if (comment[0].idUser !== loggedInUserId) {
            return res.status(403).json({error: "You do not have permission to delete this comment."});
        }

        CommentModel.deleteComment(idComment, (err, result) => {
            if (err) {
                return res.status(500).json({error: "Error deleting the comment."});
            }
            return res.status(200).json({message: "Comment deleted successfully."});
        });
    });
};

module.exports = {
    getCommentById,
    getCommentsByPost,
    createComment,
    updateComment,
    deleteComment
};