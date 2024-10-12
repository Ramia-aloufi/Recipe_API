import multer from 'multer';

// Set up multer for handling multipart/form-data
const storage = multer.memoryStorage(); // Don't save to disk, keep in memory
const upload = multer({ storage });
export default upload;