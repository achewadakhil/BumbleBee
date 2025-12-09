import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function userSignUp(req,res){
    const {email, password, role } = req.body;
    console.log(req.body)
    try{
        const foundUser = await userModel.findOne({
            email 
        });
        if(foundUser){
            console.log("Email already exists");
            res.json({
                message : "b/auth/signup",
                issue : "user already there"
            })
        }
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

export async function userSignIn(req,res){
    const {email,password} = req.body;
    const message = "b/auth/signin";

    try{
        const foundUser = await userModel.findOne({email});
        if(!foundUser){
            return res.json({
                message ,
                issue : "No email"
            });
        }

        const validPass = await bcrypt.compare(password,foundUser.password);
        if(!validPass){
            return res.json({
                message,
                issue : "err pass"
            });
        }

        const token = jwt.sign({userId : foundUser._id},process.env.JWT_SECRET,{expiresIn : "7d"});

        res.setHeader("token",token);

        res.json({
            message : "b/auth/signin ok",
            email,password,token
        });

    }catch(err){
        res.status(401).json({
            message,
            issue : "Error"
        })
    }
}