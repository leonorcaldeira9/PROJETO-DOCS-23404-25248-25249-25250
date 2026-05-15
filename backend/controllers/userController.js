
const UserModel = require('../models/userModel');

const getUserById=(req,res)=>{
    const {id} = req.params;
    UserModel.getUserById(id,(err, user)=>{
        if(err){
            return res.status(400).send()
        }
        return res.json(user)
    })
}

const getUsers=(req,res)=>{
    UserModel.getUsers((err,users)=>{
        if(err){
            return res.status(400).send()
        }
        return res.json(users)
    })
}

const createUser=(req,res)=>{
    if(!req.body.fullName || !req.body.loginPassword || !req.body.gender || !req.body.birthDate || !req.body.city || !req.body.country || !req.body.email || !req.body.phoneNumber) {
        return res.status(400).send()
    }
    UserModel.createUser(req.body,(err,user)=>{
        if(err){
            return res.status(400).send()
        }
        return res.json("User created successfully.")
    })
}
const updateUser = (req, res) => {
    const id=req.params.id;

    if (id===undefined) {
        return res.status(400).send()
    }
    if(!req.body.fullName || !req.body.loginPassword || !req.body.gender || !req.body.birthDate || !req.body.city || !req.body.country || !req.body.email || !req.body.phoneNumber) {
        return res.status(400).send()
    }
    UserModel.updateUser(id,req.body,(err,result)=>{
        if(err){
            return res.status(400).send()
        }
        return res.json("User updated successfully.")
    })
};

const deleteUser = (req, res) => {
    const  id  = req.params.id;
    if (id===undefined) {
        return res.status(400).send()
    }
    UserModel.deleteUser(id,(err,result)=>{
        if(err){
            return res.status(400).send()
        }
        return res.json("User" + id + " deleted successfully.")
    })
};


module.exports = {
    getUserById,
    getUsers,
    createUser,
    updateUser,
    deleteUser
};