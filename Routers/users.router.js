const express = require("express");
require('dotenv').config();

const { UserModel } = require("../models/users.model")
const UserRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

UserRouter.post("/register", async (req, res) => {
    const { name, email, gender, password } = req.body;
    try {
        bcrypt.hash(password, 4, async (err, hash_pass) => {
            if (err) {
                console.log(err)
            } else {
                let user = new UserModel({ name, email, gender, password:hash_pass });
                await user.save();
                res.send("Register Succesfully")
            }
        })
    } catch (error) {
        res.send({ "msg": error })
    }
})
UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await UserModel.find({email});
        let hash=user[0].password
        if(user.length>0){

            bcrypt.compare(password, hash, (err, result)=>{
                // result == true
                if(result){
                    console.log(user[0]._id)
                    const token=jwt.sign({userId:user[0]._id},"masai")
                    res.send({"msg":"Login Succesfully","token":token})
                }else{
                    res.send("Wrong Cred")
                }
            });
        }else{
            res.send("User not Found")
        }

    } catch (error) {
        res.send({ "msg": error })
    }
})


module.exports = {
    UserRouter
}