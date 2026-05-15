const express = require('express');
const router = express.Router();

const {
    getFriendshipStatus,
    getFriendsByUser,
    createFriendRequest,
    updateFriendshipStatus,
    deleteFriendship
} = require('../controllers/friendshipController');

router.get('/status/:userId/:friendId', getFriendshipStatus);

router.get('/user/:id', getFriendsByUser);

router.post('/request', createFriendRequest);

router.put('/update', updateFriendshipStatus);

router.delete('/delete/:userId/:friendId', deleteFriendship);

module.exports = router;