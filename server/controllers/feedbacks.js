import feedBackformModel from "../models/feedbackFormModel.js";
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


export async function feedBackform(req,res){
    
    const {userId} = req.user;
    const {problemBefore,seriousness,mostUseful,annoyingPart,removableFeature,usageFrequency,willingToPay,mustHaveChange,disappointmentLevel} = req.body;

    // console.log(res.body);
    try{
        await feedBackformModel.create({
            problemBefore,
            seriousness: Number(seriousness),
            mostUseful,
            annoyingPart,
            removableFeature,
            usageFrequency,
            willingToPay,
            mustHaveChange,
            disappointmentLevel,
            userId,
        });

        res.json({
            message : "submitted feedback form"
        });
    }catch(err){
        res.json({
            message : "err at b/feedbackform"
        })
    }
    
}