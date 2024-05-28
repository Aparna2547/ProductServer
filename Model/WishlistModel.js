import mongoose, { Schema } from "mongoose";

const wishlistSchema = new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    productId:{
        type:mongoose.Types.ObjectId,
        ref:'Product'
    }
})
const Wishlist = mongoose.model("Wishlist",wishlistSchema)
export default Wishlist