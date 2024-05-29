import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: 'dr2avntwv' ,
    api_key:'829874218365388',
    api_secret: 'cZ_7TCeKD4mJf0Hj-CbfmvkXgks'
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

export default saveToCloudinary