const PostModel = require('../models/postModel');

const getPostById = (req, res) => {
    const id = req.params.id;
    /*if (id === undefined) {
        return res.status(400).send();
    }*/

    if (!id) {
        return res.status(400).json({ error: "User ID is required." });
    }

    PostModel.getPostById(id, (err, post) => {
        if (err) {
            return res.status(500).json({ error: "Database error." });
        }
        if (post.length === 0) {
            return res.status(404).json({ error: "Post not found." });
        }
        return res.status(200).json(post[0]);
    });
};

const getPostsByUser = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ error: "User ID is required." });
    }

    PostModel.getPostsByUser(id, (err, posts) => {
        if (err) {
            return res.status(500).json({ error: "Database error." });
        }
        if (posts.length === 0) {
            return res.status(404).json({ error: "No posts found for this user." });
        }

        return res.status(200).json(posts);
    })
}

const getPosts = (req, res) => {
    PostModel.getPosts((err, posts) => {
        if(err){
            return res.status(500).json({ error: "Database error." });
        }

        return res.status(200).json(posts);
    });
};

const createPost = (req, res) => {
    const idUser = req.user.id;
    const { postText } = req.body;

    if (!postText) {
        return res.status(400).json({ error: "The text of the post is required." });
    }

    const postData = { idUser, postText };

    PostModel.createPost(postData, (err, post) => {
        if (err) {
            return res.status(500).json({ error: "Error creating post in database." });
        }
        return res.status(201).json({ message: "Post created successfully." });
    });
};

const updatePost = (req, res) => {
    const id = req.params.id;
    const postText = req.body.postText;
    const loggedInUserId = req.user.id;

    /*if (id === undefined) {
        return res.status(400).send();
    }
    if (!req.body.postText) {
        return res.status(400).send();
    }*/

    if (!postText) {
        return res.status(400).json({ error: "The text of the post is required." });
    }

    PostModel.getPostById(id, (err, post) => {
        if (err) {
            return res.status(500).json({ error: "Error verifying the post." });
        }
        if (post.length === 0) {
            return res.status(404).json({ error: "Post not found." });
        }

        if (post[0].idUser !== loggedInUserId) {
            return res.status(403).json({ error: "You do not have permission to update this post." });
        }

        PostModel.updatePost(id, postText, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error updating post in database." });
            }
            return res.status(200).json({ message: "Post updated successfully." });
        });
    });
};

const deletePost = (req, res) => {
    const id = req.params.id;
    const loggedInUserId = req.user.id;

    if (id === undefined) {
        return res.status(400).json({ error: "User ID is required." })
    }
    PostModel.getPostById(id, (err, post) => {
        if (err) {
            return res.status(500).json({ error: "Error verifying the post." });
        }
        if (post.length === 0) {
            return res.status(404).json({ error: "Post not found." });
        }

        if (post[0].idUser !== loggedInUserId) {
            return res.status(403).json({ error: "You do not have permission to delete this post." });
        }

        PostModel.deletePost(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error deleting post in database." });
            }
            return res.status(200).json({ message: `Post ${id} deleted successfully.` });
        });
    });
};

module.exports = {
    getPostById,
    getPosts,
    createPost,
    updatePost,
    deletePost,
    getPostsByUser
};