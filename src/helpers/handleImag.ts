import cloudinary from "../config/cloudinary.config";


    export const uploadImg = (img:string,folder:string,publicId:string)=>{
            const url = cloudinary.uploader.upload(img,{
                public_id:publicId,
                folder:folder
            })
            return url
    }

    export const deleteImageFromCloudinary = async(publicId:string) =>{
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error('Error deleting previous image:', error);
          throw error;
        }
      }
    