import { NextFunction, Request, Response } from "express";
import {
  createOne,
  getById,
  updateOneById,
  getAll,
  deleteOneById,
} from "../services/favorite.service";
import { IFavorite } from "../models/favorite.model";
import { successResponse } from "../helpers/apiResponse.helper";

export const createFavorite = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const favorite = await createOne(req.body);
    successResponse<IFavorite>(res, {
      message: "Favorite Created successfully.",
      statusCode: 201,
      data: favorite,
  })
  } catch (error) {
    next(error)
  }
};

export const getFavoriteById = async (req: Request, res: Response ,next:NextFunction) => {
  try {
    const favorite = await getById(req.params.id);
    successResponse<IFavorite>(res, {
      message: "Favorite Retrieved successfully.",
      statusCode: 201,
      data: favorite,
  })
  } catch (error) {
    next(error)
  }
};

export const getAllFavorites = async (req: Request, res: Response ,next:NextFunction) => {
  try {
    const favorites = await getAll()
    successResponse<IFavorite[]>(res, {
      message: "Favorites Retrieved successfully.",
      statusCode: 201,
      data: favorites,
  })
  } catch (error) {
    next(error)
  }
};

export const updateFavorite = async (req: Request, res: Response ,next:NextFunction) => {
  try {
    const favorite = await updateOneById(req.params.id, req.body);
    successResponse<IFavorite>(res, {
      message: "Favorite Updated successfully.",
      statusCode: 201,
      data: favorite,
  })
  } catch (error) {
    next(error)
  }
};

export const deleteFavorite = async (req: Request, res: Response ,next:NextFunction) => {
  try {
    const favorite = await deleteOneById(req.params.id)
    successResponse<IFavorite>(res, {
      message: "Favorite Deleted successfully.",
      statusCode: 201,
      data: favorite,
  })
  } catch (error) {
    next(error)
  }
};
