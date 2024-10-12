import cloudinary from "../config/cloudinary.config";


    export const uploadImg = (img:string,folder:string,publicId:string)=>{
            const url = cloudinary.uploader.upload(img,{
                public_id:publicId,
                folder:folder
            })
            return url
    }
    