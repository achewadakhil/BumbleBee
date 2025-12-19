import {mongoose , Schema} from "mongoose";

const adSchema = new Schema({
    company_name : {type : String},
    curr_cap : {type : Number},
    curr_debts : {type : Number},
    equity_share : {type : Number},
    expected_cash : {type : Number},
    monthly_rents : {type : Number},
    monthly_wages : {type : Number},
    prod_val : {type : Number},
    validity : {type : String},
    isActive : {type : Boolean, default : true}
})


const userSchema = new Schema({
    email : {type : String, required : true},
    password : {type : String,required : true},
    role : {type : String , enum : ["buyer","vendor"], required : true},
    ads : adSchema
});

const userModel = mongoose.model("users",userSchema);

export default userModel;