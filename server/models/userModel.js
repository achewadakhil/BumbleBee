import {mongoose , Schema} from "mongoose";


const userSchema = new Schema({
    email : {type : String, required : true},
    password : {type : String,required : true},
    role : {type : String , enum : ["buyer","vendor"], required : true}
});

const userModel = mongoose.model("users",userSchema);

export default userModel;