const CommentLikeModel = require('../models/CommentLikeModel');

const getLikesByComment = (req, res) => {
    const { idComment } = req.params;
    if (idComment === undefined) return res.status(400).send();

    CommentLikeModel.getLikesByComment(idComment, (err, likes) => {
        if (err) return res.status(400).send();
        return res.json(likes);
    });
};

const addLike = (req, res) => {
    const { idUser, idComment } = req.body;
    if (!idUser || !idComment) return res.status(400).send();

    CommentLikeModel.addLike(idUser, idComment, (err, result) => {
        if (err) return res.status(400).send();
        return res.json("Like added to comment successfully.");
    });
};

const removeLike = (req, res) => {
    const { idUser, idComment } = req.body;
    if (!idUser || !idComment) return res.status(400).send();

    CommentLikeModel.removeLike(idUser, idComment, (err, result) => {
        if (err) return res.status(400).send();
        return res.json("Like removed from comment successfully.");
    });
};

module.exports = {
    getLikesByComment,
    addLike,
    removeLike
};