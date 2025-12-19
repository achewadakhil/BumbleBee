import adModel from "../models/adModel.js";
import userModel from "../models/userModel.js";

export async function postAd(req,res){
    try{
        const {userId, role} = req.user;
        console.log(role);
        if(role != "vendor"){
            // console.log()
            console.log("Only vendors are allowed");
            return res.json({
                message : "only vendors allowed"
            });

        }
        const {
            company_name,
            curr_cap,
            prod_val,
            curr_debts,
            monthly_rents,
            monthly_wages,
            expected_cash,
            equity_share,
            validity
        } = req.body;

        const payload = {
            // company_name,
            curr_cap: Number(curr_cap),
            prod_val: Number(prod_val),
            curr_debts: Number(curr_debts),
            monthly_rents: Number(monthly_rents),
            monthly_wages: Number(monthly_wages),
            expected_cash: Number(expected_cash),
            equity_share: Number(equity_share),
        };

        for(const [key, value] of Object.entries(payload)){
            if(Number.isNaN(value)){

                console.log(`${key} must be a number`);
                return res.json({
                    message : `${key} must be a number`
                });
            }
        }

        payload.company_name = company_name;
        payload.validity = validity;
        payload.userId = userId;
        await adModel.create(payload);
        console.log("created successfully");
        console.log(payload);
        res.json({
            message : "Added a new post"
        });

    }catch(err){
        console.log("Err in b/v/postAd");
        console.log(err);
        res.json({
            message : "Err in b/v/postAd",
            err
        });
    }
}