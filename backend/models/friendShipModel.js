const db = require('../db_connection/db');

const FriendshipModel = {

    getFriendshipStatus: (userId, friendId, callback) => {
        const sql = 'SELECT friendshipStatus FROM friendship WHERE userId=? AND friendId=?';
        db.query(sql, [userId, friendId], callback);
    },

    getFriendsByUser: (userId, callback) => {
        const sql = `
        SELECT 
            CASE 
                WHEN F.userId = ? THEN U2.fullName 
                ELSE U1.fullName 
            END AS Friends
        FROM friendship AS F
        JOIN users AS U1 ON F.userId = U1.id
        JOIN users AS U2 ON F.friendId = U2.id
        WHERE (F.userId = ? OR F.friendId = ?) AND F.friendshipStatus = 'F'
        `;
        db.query(sql, [userId, userId, userId], callback);
    },


    createFriendRequest: (userId, friendId, callback) => {
        const sql = 'INSERT INTO friendship (userId, friendId, friendshipStatus) VALUES (?, ?, "P")';
        db.query(sql, [userId, friendId], callback);
    },


    updateFriendshipStatus: (userId, friendId, status, callback) => {
        let sql;

        if (status === 'F') {
            sql = 'UPDATE friendship SET friendshipStatus=?, friendDate=CURRENT_TIMESTAMP WHERE userId=? AND friendId=?';
        } else {
            sql = 'UPDATE friendship SET friendshipStatus=? WHERE userId=? AND friendId=?';
        }
        db.query(sql, [status, userId, friendId], callback);
    },


    deleteFriendship: (userId, friendId, callback) => {
        const sql = 'DELETE FROM friendship WHERE userId=? AND friendId=?';
        db.query(sql, [userId, friendId], callback);
    }
};

module.exports = FriendshipModel;