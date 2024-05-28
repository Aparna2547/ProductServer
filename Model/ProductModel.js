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
    brandName:{
        type:String
    },
    subCategory:{
        type:mongoose.Types.ObjectId,
        ref:'SubCategory'
    },
    description:{
        type:String

    },
    variants: [variantSchema],
    images:{
        type:[String]
    }
})

const Product  = mongoose.model("Product",productSchema)
export default Product