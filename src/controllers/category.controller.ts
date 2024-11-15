import { NextFunction, Request, Response } from "express";
import {
  successResponse,
} from "../helpers/apiResponse.helper";
import {
  createOne,
  getById,
  deleteOneById,
  updateOneById,
  getAll,
  getCategoryTotal,
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
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.size as string) || 10;
    const categoryTotal = await getCategoryTotal();
    const total =  Math.ceil(categoryTotal / pageSize)
    const categories = await getAll(page, pageSize);
    successResponse<ICategory[]>(res, {
      message: "Categories retrieved successfully.",
      statusCode: 200,
      data: categories,
      meta:{
        page:page,
        pageSize:pageSize,
        total:categoryTotal,
        totalPages: total
      }
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