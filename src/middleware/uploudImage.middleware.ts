import cloudinary from "../config/cloudinary.config";
import { NextFunction, Request, Response } from "express";
import { bufferToStream } from "../helpers/buffer.helper";
import { getByTitle } from "../services/recipe.service";
import { createError } from "../helpers/error.helper";
import { deleteImageFromCloudinary } from "../helpers/handleImag";


export const uploudIMG = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const MAX_FILE_SIZE = 1 * 1024 * 1024; 
  const file = req.file;
  var title = req.body.title

  try {
     await getByTitle(title)
    const uploadStream = cloudinary.uploader.upload_stream(
      { public_id: title },
      (error, result) => {
        if (error) {
          throw createError(400,"Upload failed")
        } else {
          req.body.media = result?.secure_url;
          return next();
        }
      }
    );
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        throw createError(400,"File size exceeds the 1MB limit")
      }

      const readableStream = bufferToStream(file.buffer);
      readableStream.pipe(uploadStream);
    } else {
      throw createError(400,"No file provided")
    }
  } catch (error) {
    return next(error);
  }
};
export const updatedIMG = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const MAX_FILE_SIZE = 1 * 1024 * 1024; 
  const file = req.file;
  var title = req.body.title

  try {
     
    if (file) {
      await deleteImageFromCloudinary(title)
      const uploadStream = cloudinary.uploader.upload_stream(
        { public_id: title },
        (error, result) => {
          if (error) {
            throw createError(400,"Upload failed")
          } else {
            req.body.media = result?.secure_url;
            return next();
          }
        }
      );

      if (file.size > MAX_FILE_SIZE) {
        throw createError(400,"File size exceeds the 1MB limit")
      }

      const readableStream = bufferToStream(file.buffer);
      readableStream.pipe(uploadStream);
    } else {
      next()
        }
  } catch (error) {
    return next(error);
  }
};

export const uploadUserIMG = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const MAX_FILE_SIZE = 1 * 1024 * 1024; 
  const file = req.file;
  var title = req.body.username

  try {
     await getByTitle(title)
    const uploadStream = cloudinary.uploader.upload_stream(
      { public_id: title },
      (error, result) => {
        if (error) {
          throw createError(400,"Upload failed")
        } else {
          req.body.profileImage = result?.secure_url;
          return next();
        }
      }
    );
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        throw createError(400,"File size exceeds the 1MB limit")
      }

      const readableStream = bufferToStream(file.buffer);
      readableStream.pipe(uploadStream);
    } else {
      throw createError(400,"No file provided")
    }
  } catch (error) {
    return next(error);
  }
};
export const updatedUserIMG = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const MAX_FILE_SIZE = 1 * 1024 * 1024; 
  const file = req.file;
  var title = req.body.username

  try {
     
    if (file) {
      await deleteImageFromCloudinary(title)
      const uploadStream = cloudinary.uploader.upload_stream(
        { public_id: title },
        (error, result) => {
          if (error) {
            throw createError(400,"Upload failed")
          } else {
            req.body.profileImage = result?.secure_url;
            return next();
          }
        }
      );

      if (file.size > MAX_FILE_SIZE) {
        throw createError(400,"File size exceeds the 1MB limit")
      }

      const readableStream = bufferToStream(file.buffer);
      readableStream.pipe(uploadStream);
    } else {
      next()
        }
  } catch (error) {
    return next(error);
  }
};
