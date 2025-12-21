import adModel from "../models/adModel.js";
import investmentModel from "../models/investmentModel.js";

export default async function buyAnAd(req,res){
    const {userId} = req.user;
    const {amount, equity } = req.body;
    const {adId} = req.params;

    // console.log("hello");

    try{

        const foundAd = await adModel.findById(adId);
        if(!foundAd){
            return res.json({
                message : "b/addNot found at b/buyAnAd"
            });
        }

        await investmentModel.create({
            userId,
            invested_amount : amount,
            equity_percent : equity,
            adId,
        });



        foundAd.received_cash += amount;

        await foundAd.save();

        // const investments = await investmentModel.find()
        // .populate("userId","email")
        // .populate("adId","company_name");

        // console.log(investments);

        res.json({
            message : "added successfully b/buyAnAd",
        });


    }catch(err){

        console.log("Err at b/buyAnAd")
        res.json({
            message : "err at b/buyAnAd",
            err
        })
    }
}