const PostModel = require('../models/postModel');
const UserModel = require('../models/userModel');
const FriendshipModel = require('../models/friendShipModel');

const verifyPostAccess = (idPost, idLoggedInUser, res, onSuccessCallback) => {

    PostModel.getPostById(idPost, (err, postArray) => {
        if (err) return res.status(500).json({ error: "Error verifying the post." });
        if (postArray.length === 0) return res.status(404).json({ error: "Post not found." });

        const targetPost = postArray[0];

        if (targetPost.idUser === idLoggedInUser) {
            return onSuccessCallback(targetPost);
        }

        if (targetPost.visibility === "pu") {
            return onSuccessCallback(targetPost);
        }

        FriendshipModel.checkIfFriends(idLoggedInUser, targetPost.idUser, (err, areFriends) => {
            if (err) return res.status(500).json({ error: "Error checking permissions." });

            if (!areFriends) {
                return res.status(403).json({ error: "Access denied. This account or post is private." });
            }

            return onSuccessCallback(targetPost);
        });
    });
};

module.exports = { verifyPostAccess };