import adModel from "../models/adModel.js";

export async function getAllPosts(req, res){

    const {token} = req.headers;


    // console.log(`token : ${token}`);

    const allPosts = await adModel
    .find()
    .select("company_name equity_share expected_cash validity userId createdAt")
    .populate("userId", "email")
    .sort({ createdAt: -1 });

    res.json({ allPosts });

    
    console.log(allPosts);  


    res.json({
        message : "b/allPosts",
        token,
        allPosts
    });

}