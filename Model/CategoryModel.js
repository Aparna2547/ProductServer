import mongoose  from "mongoose";

const categorySchema = new mongoose.Schema({
    category:{
        type:String
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})

const Category = mongoose.model("Category",categorySchema)
export default Category