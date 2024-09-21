import { NextFunction, Request, Response } from "express";
import {
  errorResponse,
  successResponse,
} from "../helpers/apiResponse.helper";
import {
  createOne,
  getById,
  deleteOneById,
  updateOneById,
  getAll,
} from "../services/category.service";
import { ICategory } from "../models/category.model";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {    
    const category = await createOne(req.body)
    successResponse<ICategory>(res, {
      message: "Category Created successfully.",
      statusCode: 200,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await getById(req.params.id);
      successResponse<ICategory>(res, {
        message: "Category retrieved successfully.",
        statusCode: 200,
        data: category,
      })

  } catch (error) {
     next(error);
  }
};

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await getAll();
    successResponse<ICategory[]>(res, {
      message: "Categories retrieved successfully.",
      statusCode: 200,
      data: categories,
    });
  } catch (error) {
     next(error);
  }
}

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {    
    const category = await updateOneById(req.params.id, req.body);
      successResponse<ICategory>(res, {
        message: "Category updated successfully.",
        statusCode: 200,
        data: category,
      })

  } catch (error) {    
     next(error);
  }
}

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await deleteOneById(req.params.id);
      successResponse<ICategory>(res, {
        message: "Category deleted successfully.",
        statusCode: 200,
        data: category,
      })
  } catch (error) {
     next(error);
  }
}