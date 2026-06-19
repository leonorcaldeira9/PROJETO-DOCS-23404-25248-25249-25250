const express = require('express');
const router = express.Router();

const {
    getFriendshipStatus,
    getFriendsByUser,
    createFriendRequest,
    updateFriendshipStatus,
    deleteFriendship,
    getFriendsRequests,
    getBlockedUsersByUser
} = require('../controllers/friendshipController');
const authJWT = require("../middlewares/authJWT");

/*router.get('/status/:userId/:friendId', authJWT(), getFriendshipStatus);*/

router.get('/requests/pending', authJWT(), getFriendsRequests);

router.get('/status/:friendId', authJWT(), getFriendshipStatus);

router.get('/blocked', authJWT(), getBlockedUsersByUser);

router.get('/user/:id', authJWT(), getFriendsByUser);

router.post('/request', authJWT(), createFriendRequest);

router.put('/update', authJWT(), updateFriendshipStatus);

/*router.delete('/delete/:userId/:friendId', authJWT(), deleteFriendship);*/
router.delete('/delete/:id', authJWT(), deleteFriendship);

module.exports = router;