const FriendshipModel = require('../models/FriendshipModel');

const getFriendshipStatus = (req, res) => {
    const { userId, friendId } = req.params;
    if (userId === undefined || friendId === undefined) return res.status(400).send();

    FriendshipModel.getFriendshipStatus(userId, friendId, (err, status) => {
        if (err) return res.status(400).send();
        return res.json(status);
    });
};

const getFriendsByUser = (req, res) => {
    const  userId  = req.params.id;
    if (userId === undefined) return res.status(400).send("Este erro nao é fixe");

    FriendshipModel.getFriendsByUser(userId, (err, friends) => {
        if (err) return res.status(400).send("este erro é fixe");
        return res.json(friends);
    });
};

const createFriendRequest = (req, res) => {
    const { userId, friendId } = req.body;
    if (!userId || !friendId) return res.status(400).send();

    FriendshipModel.createFriendRequest(userId, friendId, (err, result) => {
        if (err) return res.status(400).send();
        return res.json("Friend request sent successfully.");
    });
};

const updateFriendshipStatus = (req, res) => {

    const { userId, friendId, friendshipStatus } = req.body;


    if (!userId || !friendId || !friendshipStatus) return res.status(400).send("Este erro ao update status");

    FriendshipModel.updateFriendshipStatus(userId, friendId, friendshipStatus, (err, result) => {
        if (err) return res.status(400).send("Este erro e parvo");
        return res.json("Friendship status updated to " + friendshipStatus + ".");
    });
};

const deleteFriendship = (req, res) => {
    const { userId, friendId } = req.params;
    if (!userId || !friendId) return res.status(400).send();

    FriendshipModel.deleteFriendship(userId, friendId, (err, result) => {
        if (err) return res.status(400).send();
        return res.json("Friendship or request deleted successfully.");
    });
};

module.exports = {
    getFriendshipStatus,
    getFriendsByUser,
    createFriendRequest,
    updateFriendshipStatus,
    deleteFriendship
};