const db = require("../db_connection/db");


const getUser=async (req,res)=> {
    try{
       const user= db.query('select * from users where id=?', [req.params.id])
    }catch(err){
        return res.status(500).json(err);
    }
}


const updateUser=(req,res)=> {
    const {fullName,loginPassword,privacy,gender,birthDate,maritalStatus,city,country,email,phoneNumber}=req.body;
    db.query('Insert into users(fullName,loginPassword,privacy,gender,birthDate,maritalStatus,city,country,email,phoneNumber) values(?,?,?,?,?,?,?,?,?,?)',[fullName,loginPassword,privacy,gender,birthDate,maritalStatus,city,country,email,phoneNumber],(err,result)=>{
        try{
            res.js
        }catch(err){
            return res.status(500).json(err);
        }
        res.json({id:result.insertId,fullName,loginPassword,privacy,gender,birthDate,maritalStatus,city,country,email,phoneNumber});
    })
}


