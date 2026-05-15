const PostLikeModel = require('../models/PostLikeModel');



const addLike = (req, res) => {
    const { idUser, idPost } = req.body;
    if (!idUser || !idPost) return res.status(400).send();

    PostLikeModel.addLike(idUser, idPost, (err, result) => {
        if (err) return res.status(400).send();
        return res.json("Like added successfully.");
    });
};

const removeLike = (req, res) => {
    const { idUser, idPost } = req.params; // Num DELETE as vezes manda-se por params, mas vou seguir o teu req.body
    if (!idUser || !idPost) return res.status(400).send();

    PostLikeModel.removeLike(idUser, idPost, (err, result) => {
        if (err) return res.status(400).send();
        return res.json("Like removed successfully.");
    });
};


const getLikesByPost = (req, res) => {
    const  idPost  = req.params.id;
    if (idPost === undefined) return res.status(400).send();

    PostLikeModel.getLikesByPost(idPost, (err, likes ) => {
        if (err) return res.status(400).send();
        return res.json(likes);
    });
};

const getPostLikesByUser = (req, res) => {
    const  idPost  = req.params.id;
    if (idPost === undefined) return res.status(400).send();

    PostLikeModel.getPostLikesByUser(idPost, (err, likes ) => {
        if (err) return res.status(400).send();
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