import { NextFunction, Request, Response } from "express";
import { IRecipe, Recipe } from "../models/recipe.model";
import { getById, updateOneById, deleteOneById, getAll ,createOne} from "../services/recipe.service";
import { CustomRequest } from "../types/customRequest.type";
import { successResponse } from "../helpers/apiResponse.helper";

// Create a new recipe
export const createRecipe = async (req: CustomRequest, res: Response,next:NextFunction) => {
  
  try {
    // const {
    //   title,
    //   preparationTime,
    //   cookingTime,
    //   servings,
    //   chef = req.id,
    //   category,
    //   media, 
    //   ingredients, 
    //   steps, 
    //   comments = []
    //     }:IRecipe = req.body;

    const newRecipe:IRecipe = req.body

    // const newRecipe :IRecipe= {
    //   title,
    //   preparationTime,
    //   cookingTime,
    //   servings,
    //   chef,
    //   category,
    //   media,
    //   ingredients,
    //   steps,
    //   comments
    // }
    const savedRecipe = await createOne(newRecipe)
    successResponse<IRecipe>(res,{
      message:"Recipe Saved successfully.",
      statusCode:201,
      data:savedRecipe
  })  
  } catch (error) {
    next(error)
   }
}

export const getRecipeById = async (req: Request, res: Response,next:NextFunction) => {
  try {

    const recipe = await getById(req.params.id);
      successResponse<IRecipe>(res,{
        message:"Recipe Retrieved successfully.",
        statusCode:200,
        data:recipe
    }) 

  } catch (error) {
    next(error)
  }
}

export const getAllRecipes = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const recipes = await getAll();
    successResponse<IRecipe[]>(res,{
      message:"Recipe Retrieved successfully.",
      statusCode:200,
      data:recipes
  })  
 } catch (error) {
  next(error)
  }
}

export const updateRecipe = async (req: Request, res: Response ,next:NextFunction) => {
  try {
    const recipe = await updateOneById(req.params.id, req.body);
    successResponse<IRecipe>(res,{
      message:"Recipe Updated successfully.",
      statusCode:200,
      data:recipe
  }) 

  } catch (error) {
    next(error)
  }
}

export const deleteRecipe = async (req: Request, res: Response ,next:NextFunction) => {
  try {
    const recipe = await deleteOneById(req.params.id)
    successResponse<IRecipe>(res,{
      message:"Recipe Deleted successfully.",
      statusCode:200,
      data:recipe
  }) 
  } catch (error) {
    next(error)
  }
}
