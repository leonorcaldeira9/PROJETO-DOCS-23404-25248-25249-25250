const express = require('express');
const app = express();
const db = require('../db_connection/db');
const post = express.Router();


post.get('/posts', (req, res) => {
    const sql = 'SELECT * FROM posts ORDER BY postDate DESC';

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro a buscar os posts' });
        }
        res.json(results);
    });
});

post.post('/posts', (req, res) => {

    const { idUser, postText } = req.body;
    const sql = 'INSERT INTO posts (idUser, postText) VALUES (?, ?)';

    db.query(sql, [idUser, postText], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro a criar o post' });
        }
        res.status(201).json({ mensagem: 'Post criado com sucesso!', idPost: result.insertId });
    });
});

post.put('/posts/:id', (req, res) => {
    const idPost = req.params.id;
    const { postText } = req.body;

    const sql = 'UPDATE posts SET postText = ? WHERE id = ?';

    db.query(sql, [postText, idPost], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro a atualizar o post' });
        }
        res.json({ mensagem: 'Post atualizado com sucesso!' });
    });
});


post.delete('/posts/:id', (req, res) => {
    const idPost = req.params.id;

    //delete cascade tem de ser no MySql
    const sql = 'DELETE FROM posts WHERE id = ?';

    db.query(sql, [idPost], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro a apagar o post. Verifica se tem comentários/likes.' });
        }
        res.json({ mensagem: 'Post apagado para sempre!' });
    });
});

module.exports = post;