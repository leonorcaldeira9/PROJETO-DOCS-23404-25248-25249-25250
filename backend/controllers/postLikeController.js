const PostLikeModel = require('../models/PostLikeModel');

const addLike = (req, res) => {
    const idUser = req.user.id;
    const { idPost } = req.body;

    /*const { idUser, idPost } = req.body;*/
    /*if (!idUser || !idPost) return res.status(400).send();*/

    if (!idPost) {
        return res.status(400).json({ error: "The post ID is required." });
    }

    PostLikeModel.addLike(idUser, idPost, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error adding like." });
        }

        return res.status(201).json({ message: "Like added successfully." });
    });
};

const removeLike = (req, res) => {
    /*const { idUser, idPost } = req.params;
    if (!idUser || !idPost) return res.status(400).send();*/

    const idUser = req.user.id;
    const { idPost } = req.params;

    if (!idPost) {
        return res.status(400).json({ error: "The post ID is required." });
    }

    PostLikeModel.removeLike(idUser, idPost, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error deleting like." });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Like not found." });
        }

        return res.status(200).json({ message: "Like removed successfully." });
    });
};


const getLikesByPost = (req, res) => {
    const  idPost  = req.params.id;
    /*if (idPost === undefined) return res.status(400).send();*/

    if (!idPost) {
        return res.status(400).json({ error: "The post ID is required." });
    }

    PostLikeModel.getLikesByPost(idPost, (err, likes ) => {
        if (err) {
            return res.status(500).json({ error: "Error searching for the likes." });
        }

        /*if (likes.length === 0) {
            return res.status(404).json({ error: "Post likes not found." });
        }*/

        return res.status(200).json(likes);
    });
};

const getPostLikesByUser = (req, res) => {
    /*const  idPost  = req.params.id;
    if (idPost === undefined) return res.status(400).send();*/

    const idUser = req.params.id;

    if (!idUser) {
        return res.status(400).json({ error: "The user ID is required." });
    }

    PostLikeModel.getPostLikesByUser(idUser, (err, likes ) => {
        if (err) {
            return res.status(500).json({ error: "Error searching for the user's likes" });
        }

        /*if (likes.length === 0) {
            return res.status(404).json({ error: "Post likes not found." });
        }*/

        return res.status(200).json(likes);
    });
};

const getUsersLikePost = (req,res)=>{
    const idPost = req.params.id;
    /*if(idPost === undefined){
        return res.status(400).send();
    }*/

    if (!idPost) {
        return res.status(400).json({ error: "The post ID is required." });
    }

    PostLikeModel.getUsersLikePost(idPost, (err, users) => {
        if (err) {
            return res.status(500).json({ error: "Error searching for the users." });
        }

        /*if (result.length === 0) {
            return res.status(404).json({ error: "User like not found." });
        }*/

        return res.status(200).json(users);
    });
};

module.exports = {
    getLikesByPost,
    addLike,
    removeLike,
    getPostLikesByUser,
    getUsersLikePost
};