import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
    RAM: {
        type: String,
        required: true
    },
    Processor: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    }
});

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
    },
    subCategory:{
        type:mongoose.Types.ObjectId,
        ref:'SubCategory'
    },
    description:{
        type:String

    },
    variants: [],
    images:{
        type:[String]
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})

const Product  = mongoose.model("Product",productSchema)
export default Product