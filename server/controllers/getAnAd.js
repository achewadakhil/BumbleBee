import adModel from "../models/adModel.js";

export async function getAnAd(req,res){
    const {adId} = req.params;

    try{
        // console.log(adId);

        const foundAd = await adModel.findById(adId).populate("userId","email");
        console.log(foundAd);

        const {equity_share, expected_cash, received_cash} = foundAd;
        const cash_remaining = expected_cash - 100;
        const equity_remaining = (cash_remaining*equity_share) / expected_cash;
        console.log(foundAd);
        res.json({
            message : "b/getAnAdd",
            // adId,
            foundAd : {
                ...foundAd.toObject(),
                cash_remaining,
                equity_remaining
            }
        });
    }catch(err){
        res.json({
            message : "err at b/getAnAd",
            err
        });
    }

}