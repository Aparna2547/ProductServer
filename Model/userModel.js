import mongoose, { mongo } from "mongoose"

const userSchema = new mongoose.Schema({
    mobile:{
       type: Number,
    required:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})

const User = mongoose.model("User",userSchema)
export default User