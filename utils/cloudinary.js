import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD ,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const saveToCloudinary = async (file)=>{
    try {
        const result = await cloudinary.uploader.upload(file?.path)
        file = result.secure_url
        return file
    } catch (error) {
        console.log(error);
    }
}

export default {saveToCloudinary}