import { mongoose, Schema} from "mongoose";

const adSchema = new Schema({

    company_name : {type : String, required : true},
    curr_cap : {type : Number, required : true},
    curr_debts : {type : Number, required : true},
    equity_share : {type : Number, required : true},
    expected_cash : {type : Number, required : true},
    received_cash : {type : Number, default : 0},
    monthly_rents : {type : Number, required : true},
    monthly_wages : {type : Number, required : true},
    prod_val : {type : Number, required : true},
    validity : {type : Date, required : true},
    isActive : {type : Boolean, default : true},
    userId : {type : Schema.Types.ObjectId , ref : "users"}

});

const adModel = mongoose.model("vendorAds",adSchema);

export default adModel;
