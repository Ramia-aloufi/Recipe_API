import { v2 as cloudinary } from 'cloudinary';
import { dev } from '../config/dev.configuration'

    // Configuration
     cloudinary.config({ 
        cloud_name: dev.cloudinary.name, 
        api_key: dev.cloudinary.key, 
        api_secret: dev.cloudinary.secret // Click 'View API Keys' above to copy your API secret
    });
    export default cloudinary;