import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export async function UserSignUp(req,res){
    const {email, password, role } = req.body;
    console.log(req.body)
    try{
        await userModel.create({
            email,
            password : await bcrypt.hash(password,10),
            role
        });
        res.json({
            message : "b/auth/signup ok"
        })
    }catch(err){
        res.status(401).json({
            message : "b/auth/signup",
            errors : err
        });
    }
}