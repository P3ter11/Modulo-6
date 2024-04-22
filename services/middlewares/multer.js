import multer from "multer";
import {v2 as cloudinary} from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import { config } from "dotenv";

config()
          
cloudinary.config({ 
  cloud_name: 'drzpagvhc', 
  api_key: '675187499265462', 
  api_secret: 'MM3B7EwEnrrxgJzk8lz8CUTCdpg' 
});

const options = {
    storage: new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "cover",
      },
    }),
  };
  
  export default multer(options).single("cover");