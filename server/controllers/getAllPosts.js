import adModel from "../models/adModel.js";

export async function getAllPosts(req, res){

    const {token} = req.headers;

    // console.log(`token : ${token}`);

    const allPosts = await adModel.find();
    
    console.log(allPosts);  


    res.json({
        message : "b/allPosts",
        token,
        allPosts
    });

}