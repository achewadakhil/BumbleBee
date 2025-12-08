import userModel from "../models/userModel.js";

export async function UserSignUp(req,res){
    const {email, password, role } = req.body;
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