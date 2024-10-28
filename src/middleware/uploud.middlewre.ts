import multer from 'multer';
const MAX_FILE_SIZE = 1 * 1024 * 1024; 

// Set up multer for handling multipart/form-data
const storage = multer.memoryStorage(); // Don't save to disk, keep in memory
const upload = multer({ storage, limits: { fileSize: MAX_FILE_SIZE }, });
export default upload;