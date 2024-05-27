import mongoose from "mongoose"

const subCategorySchema = new mongoose.Schema({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    subCategory:{
        type:"String"
    }
})

const SubCategory  = mongoose.model("SubCategory",subCategorySchema)
export default SubCategory