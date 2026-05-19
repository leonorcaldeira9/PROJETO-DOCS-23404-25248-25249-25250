const PostLikeModel = require('../models/PostLikeModel');

const addLike = (req, res) => {
    const { idUser, idPost } = req.body;
    if (!idUser || !idPost) return res.status(400).send();

    PostLikeModel.addLike(idUser, idPost, (err, result) => {
        if (err) return res.status(404).send();

        return res.json("Like added successfully.");
    });
};

const removeLike = (req, res) => {
    const { idUser, idPost } = req.params;
    if (!idUser || !idPost) return res.status(400).send();

    PostLikeModel.removeLike(idUser, idPost, (err, result) => {
        if (err) return res.status(400).send();

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Post not found." });
        }

        return res.json("Like removed successfully.");
    });
};


const getLikesByPost = (req, res) => {
    const  idPost  = req.params.id;
    if (idPost === undefined) return res.status(400).send();

    PostLikeModel.getLikesByPost(idPost, (err, likes ) => {
        if (err) return res.status(400).send();

        if (likes.length === 0) {
            return res.status(404).json({ error: "Post likes not found." });
        }
        return res.json(likes);
    });
};

const getPostLikesByUser = (req, res) => {
    const  idPost  = req.params.id;
    if (idPost === undefined) return res.status(400).send();

    PostLikeModel.getPostLikesByUser(idPost, (err, likes ) => {
        if (err) return res.status(400).send();

        if (likes.length === 0) {
            return res.status(404).json({ error: "Post likes not found." });
        }

        return res.json(likes);
    });
};

const getUsersLikePost = (req,res)=>{
    const idPost = req.params.id;
    if(idPost === undefined){
        return res.status(400).send();
    }

    PostLikeModel.getUsersLikePost(idPost, (err, result) => {
        if (err){
            return res.status(400).send();
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "User like not found." });
        }

        return res.json(result);
    })
}

module.exports = {
    getLikesByPost,
    addLike,
    removeLike,
    getPostLikesByUser,
    getUsersLikePost
};