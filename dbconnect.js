import mongoose  from "mongoose"

export const connectDb =async () =>{
    try {
        const uri = process.env.mongo_uri
        await mongoose.connect(uri)
    } catch (error) {
        console.log(error);
    }
}