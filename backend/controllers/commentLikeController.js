const CommentLikeModel = require('../models/CommentLikeModel');

const getLikesByComment = (req, res) => {
    const idComment = req.params.id;
    if (idComment === undefined) return res.status(400).send();

    CommentLikeModel.getLikesByComment(idComment, (err, likes) => {
        if (err) return res.status(400).send();

        if (likes.affectedRows === 0) {
            return res.status(404).json({ error: "Likes not found." });
        }

        return res.json(likes);
    });
};

const addLike = (req, res) => {
    const { idUser, idComment } = req.body;
    if (!idUser || !idComment) return res.status(400).send();

    CommentLikeModel.addLike(idUser, idComment, (err, result) => {
        if (err) return res.status(400).send();

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Comment not found." });
        }

        return res.json("Like added to comment successfully.");
    });
};

const removeLike = (req, res) => {
    const { idUser, idComment } = req.params;
    if (!idUser || !idComment) return res.status(400).send();

    CommentLikeModel.removeLike(idUser, idComment, (err, result) => {
        if (err) return res.status(400).send();

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Comment not found." });
        }

        return res.json("Like removed from comment successfully.");
    });
};

module.exports = {
    getLikesByComment,
    addLike,
    removeLike
};



