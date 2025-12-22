import feedBackModel from "../models/feedbackModel.js";

export async function feedBack(req, res){

    const {message} = req.body;
    
    const {userId} = req.user;

    console.log(message);

    try{

        const user = await feedBackModel.create({
            message,
            userId
        });

        console.log("Added successfully");
        
        return res.json({
            user
        });
    }catch(err){

        console.log("err at b/feedBacks");

        return res.json({
            message  : "err b/feedBacks"
        });
    }


}