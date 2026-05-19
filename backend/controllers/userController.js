const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUserById=(req,res)=>{
    const {id} = req.params;
    UserModel.getUserById(id,(err, user)=>{
        if(err){
            return res.status(400).send()
        }
        
        if(res.affectedRows === 0) {
            return res.status(404).json({ error: "User not found." });
        }
        
        return res.json(user)
    })
}

const getUsers=(req,res)=>{
    UserModel.getUsers((err,users)=>{
        if(err){
            return res.status(400).send()
        }

        if(res.affectedRows === 0) {
            return res.status(404).json({ error: "Users not found." });
        }

        return res.json(users)
    })
}

const createUser=(req,res)=>{
    if(!req.body.fullName || !req.body.loginPassword || !req.body.gender || !req.body.birthDate || !req.body.city || !req.body.country || !req.body.email || !req.body.phoneNumber) {
        return res.status(400).send()
    }

    const encryptSecurityLevel = 10;

    bcrypt.hash(req.body.loginPassword, encryptSecurityLevel, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: "Error encrypting password." });
        }

        req.body.loginPassword = hash;

        UserModel.createUser(req.body, (err, user) => {
            if(err){
                return res.status(400).send(err);
            }
            return res.status(201).json({ message: "User created successfully." });
        });
    });

}



const loginUser = (req, res) => {
    const { email, loginPassword } = req.body;

    if (!email || !loginPassword) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    UserModel.getUserByEmail(email, (err, results) => {
        if (err) return res.status(500).send();

        if (results.length === 0) {
            return res.status(401).json({ error: "User not found." });
        }

        const user = results[0];

        bcrypt.compare(loginPassword, user.loginPassword, (err, isMatch) => {
            if (err) return res.status(500).send();

            if (isMatch) {
                
                const token = jwt.sign(
                    { id: user.id },
                    'volvosSaoBonitos-09-PeugeotsTambem-27-OpelTambem-20-naoTemPopo-13',
                    { expiresIn: '2h' } 
                );
                
                return res.json({
                    message: "Login successfull!",
                    token: token 
                });
            } else {
                return res.status(401).json({ error: "Incorrect password." });
            }

            if(res.affectedRows === 0) {
                return res.status(404).json({ error: "Users not found." });
            }

        });


    });
};

const updateUser = (req, res) => {
    const id=req.params.id;

    if (id===undefined) {
        return res.status(400).send()
    }
    if(!req.body.fullName || !req.body.loginPassword || !req.body.gender || !req.body.birthDate || !req.body.maritalStatus || !req.body.city || !req.body.country || !req.body.email || !req.body.phoneNumber) {
        return res.status(400).send()
    }
    UserModel.updateUser(id,req.body,(err,result)=>{
        if(err){
            return res.status(400).send()
        }
        if(res.affectedRows === 0) {
            return res.status(404).json({ error: "User not found." });
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

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        return res.json("User" + id + " deleted successfully.")
    })
};


module.exports = {
    getUserById,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    loginUser
};