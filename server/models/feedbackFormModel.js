import mongoose, { Schema } from "mongoose";

const feedBackformSchema = new Schema({
    problemBefore: {type : String, required : true},
    seriousness: {type : Number, required : true},
    mostUseful: {type : String, required : true},
    annoyingPart: {type : String, required : true},
    removableFeature: {type : String, required : true},
    usageFrequency: {type : String, required : true},
    willingToPay: {type : String, required : true},
    mustHaveChange: {type : String, required : true},
    disappointmentLevel: {type : String,required : true},
    userId : { type : Schema.Types.ObjectId, ref : "users" ,required : true},

});

const feedBackformModel = mongoose.model("feedbackforms",feedBackformSchema);

export default feedBackformModel;