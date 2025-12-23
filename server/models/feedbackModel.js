import mongoose, { Schema } from "mongoose";


const feedBackSchema = new Schema({
    userId : { type : Schema.Types.ObjectId, ref : "users" ,required : true},
    message : { type : String, required : true}
});

const feedBackModel = mongoose.model("feedbacks",feedBackSchema);



export default feedBackModel;