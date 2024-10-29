import { NextFunction, Request, Response } from "express";
import {
  createOne,

  deleteOneById,
} from "../services/favorite.service";
import { IFavorite } from "../models/favorite.model";
import { successResponse } from "../helpers/apiResponse.helper";
import { addFavorite, removeFavorite } from "../services/user.service";

export const createFavorite = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const data = {
      user:req.id,
      recipe:req.body.recipe
    }
    const favorite = await createOne(data);
     await addFavorite(req.id,  favorite._id as string);
    successResponse<IFavorite>(res, {
      message: "Favorite Created successfully.",
      statusCode: 201,
      data: favorite,
  })
  } catch (error) {
    next(error)
  }
};



export const deleteFavorite = async (req: Request, res: Response ,next:NextFunction) => {
  try {
    const data = {
      user:req.id,
    }
    await deleteOneById(req.params.id)
    await removeFavorite(req.id,  req.params.id as string);
    successResponse<null>(res, {
      message: "Favorite Deleted successfully.",
      statusCode: 201,
      data: null,
  })
  } catch (error) {
    next(error)
  }
};
