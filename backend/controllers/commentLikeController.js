const CommentLikeModel = require('../models/CommentLikeModel');
const CommentModel = require('../models/CommentModel');
const {verifyPostAccess} = require("../utils/securityHelper");

/*const getLikesByComment = (req, res) => {
    const idComment = req.params.id;
    //if (idComment === undefined) return res.status(400).send();

    if (!idComment) {
        return res.status(400).json({ error: "Comment ID is required." });
    }

    CommentLikeModel.getLikesByComment(idComment, (err, likes) => {
        if (err) {
            return res.status(500).json({ error: "Error searching for likes in the database." });
        }

        return res.status(200).json(likes);
    });
};*/

const getLikesByComment = (req, res) => {
    const idComment = req.params.id;
    const idLoggedInUser = req.user.id;

    if (!idComment) {
        return res.status(400).json({ error: "Comment ID is required." });
    }

    CommentModel.getCommentById(idComment, (err, commentArray) => {
        if (err) return res.status(500).json({ error: "Database error." });
        if (commentArray.length === 0) return res.status(404).json({ error: "Comment not found." });

        const idPost = commentArray[0].idPost;

        verifyPostAccess(idPost, idLoggedInUser, res, () => {

            CommentLikeModel.getLikesByComment(idComment, (err, likes) => {
                if (err) return res.status(500).json({ error: "Error searching for likes in the database." });
                return res.status(200).json(likes);
            });
        });
    });
};

/*const getUsersLikeComment = (req, res) => {
    const idComment = req.params.id;

    if (!idComment) {
        return res.status(400).json({ error: "Comment ID is required." });
    }

    CommentLikeModel.getUsersLikeComment(idComment, (err, users) => {
        if (err) {
            return res.status(500).json({ error: "Error searching for the users." });
        }

        return res.status(200).json(users);
    });
};*/

const getUsersLikeComment = (req, res) => {
    const idComment = req.params.id;
    const idLoggedInUser = req.user.id;

    if (!idComment) {
        return res.status(400).json({ error: "Comment ID is required." });
    }

    CommentModel.getCommentById(idComment, (err, commentArray) => {
        if (err) {
            return res.status(500).json({ error: "Error searching for the users." });
        }

        if (commentArray.length === 0) return res.status(404).json({ error: "Comment not found." });

        const idPost = commentArray[0].idPost;

        verifyPostAccess(idPost, idLoggedInUser, res, () => {
            CommentLikeModel.getUsersLikeComment(idComment, (err, users) => {
                if (err) return res.status(500).json({ error: "Error searching for the users." });
                return res.status(200).json(users);
            });
        });
    });
};

/*const addLike = (req, res) => {

    const idUser = req.user.id;
    const { idComment } = req.body;

    if (!idComment) {
        return res.status(400).json({ error: "Comment ID is required." });
    }

    CommentLikeModel.addLike(idUser, idComment, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error adding the like." });
        }

        return res.json("Like added to the comment successfully.");
    });
};*/

const addLike = (req, res) => {
    /*const { idUser, idComment } = req.body;
    if (!idUser || !idComment) return res.status(400).send();*/

    const idUser = req.user.id;
    const { idComment } = req.body;

    if (!idComment) {
        return res.status(400).json({ error: "Comment ID is required." });
    }

    CommentModel.getCommentById(idComment, (err, commentArray) => {
        if (err) return res.status(500).json({ error: "Database error." });
        if (commentArray.length === 0) return res.status(404).json({ error: "Comment not found." });

        const idPost = commentArray[0].idPost;

        verifyPostAccess(idPost, idUser, res, () => {
            CommentLikeModel.addLike(idUser, idComment, (err, result) => {
                if (err) return res.status(500).json({ error: "Error adding the like." });
                return res.status(201).json({ message: "Like added to the comment successfully." });
            });
        });
    });
};

const removeLike = (req, res) => {
    /*const { idUser, idComment } = req.params;
    if (!idUser || !idComment) return res.status(400).send();*/

    const idUser = req.user.id;
    const { idComment } = req.params;

    if (!idComment) {
        return res.status(400).json({ error: "Comment ID is required." });
    }

    CommentLikeModel.removeLike(idUser, idComment, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error deleting the like." });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Comment not found." });
        }

        return res.status(200).json({ message: "Like removed from comment successfully."});
    });
};

module.exports = {
    getLikesByComment,
    addLike,
    removeLike,
    getUsersLikeComment
};



