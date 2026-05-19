const PostModel = require('../models/postModel');

const getPostById = (req, res) => {
    const id = req.params.id;
    if (id === undefined) {
        return res.status(400).send();
    }
    PostModel.getPostById(id, (err, post) => {
        if (err) {
            return res.status(500).send();
        }
        if (post.affectedRows === 0) {
            return res.status(404).json({ error: "Post not found." });
        }
        return res.json(post);
    });
};

const getPostsByUser = (req, res) => {
    const id = req.params.id;
    PostModel.getPostsByUser(id, (err, posts) => {
        if (err) {
            return res.status(500).send();
        }
        if (posts.affectedRows === 0) {
            return res.status(404).json({ error: "Post not found." });
        }
        return res.json(posts);
    })
}

const getPosts = (req, res) => {
    PostModel.getPosts((err, posts) => {
        if (err) {
            return res.status(400).send();
        }

        if (posts.affectedRows === 0) {
            return res.status(404).json({ error: "Posts not found." });
        }
        return res.json(posts);
    });
};

const createPost = (req, res) => {
    if (!req.body.idUser || !req.body.postText) {
        return res.status(400).send();
    }
    PostModel.createPost(req.body, (err, post) => {
        if (err) {
            return res.status(400).send();
        }
        return res.json("Post created successfully.");
    });
};

const updatePost = (req, res) => {
    const id = req.params.id;
    const postText = req.body.postText;

    if (id === undefined) {
        return res.status(400).send();
    }
    if (!req.body.postText) {
        return res.status(400).send();
    }
    PostModel.updatePost(id, postText, (err, result) => {
        if (err) {
            return res.status(400).send();
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Post not found." });
        }
        return res.json("Post updated successfully.");
    });
};

const deletePost = (req, res) => {
    const id = req.params.id;

    if (id === undefined) {
        return res.status(400).send();
    }
    PostModel.deletePost(id, (err, result) => {
        if (err) {
            return res.status(400).send();
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Post not found." });
        }

        return res.json("Post " + id + " deleted successfully.");
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