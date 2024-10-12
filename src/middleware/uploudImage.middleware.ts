import cloudinary from "../config/cloudinary.config";
import { NextFunction, Request, Response } from "express";
import { bufferToStream } from "../helpers/buffer.helper";
import { getByTitle } from "../services/recipe.service";
import { createError } from "../helpers/error.helper";


export const uploudIMG = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const MAX_FILE_SIZE = 1 * 1024 * 1024; 

  try {
    var title = req.body.title

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
    if (req.file) {
      if (req.file.size > MAX_FILE_SIZE) {
        throw createError(400,"File size exceeds the 1MB limit")
      }
      const readableStream = bufferToStream(req.file.buffer);
      readableStream.pipe(uploadStream);
    } else {
      throw createError(400,"No file provided")
    }
  } catch (error) {
    return next(error);
  }
};
