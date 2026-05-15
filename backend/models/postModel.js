const db = require('../db_connection/db');

const PostModel = {
    getPostById: (id, callback) => {
        const sql = 'SELECT * FROM posts WHERE id=?';
        db.query(sql, [id], callback);
    },

    getPosts: (callback) => {
        const sql = 'SELECT * FROM posts ORDER BY postDate DESC';
        db.query(sql, callback);
    },

    getPostsByUser: (idUser, callback) => {
        const sql = 'SELECT * FROM posts WHERE idUser=? ORDER BY postDate DESC';
        db.query(sql, [idUser], callback);
    },

    createPost: (postData, callback) => {
        const { idUser, postText } = postData;
        const sql = 'INSERT INTO posts (idUser, postText) VALUES (?, ?)';
        db.query(sql, [idUser, postText], callback);
    },

    updatePost: (id, postText, callback) => {
        const sql = 'UPDATE posts SET postText=? WHERE id=?';
        db.query(sql, [postText, id], callback);
    },

    deletePost: (id, callback) => {
        const sql = 'DELETE FROM posts WHERE id=?';
        db.query(sql, [id], callback);
    }
};

module.exports = PostModel;