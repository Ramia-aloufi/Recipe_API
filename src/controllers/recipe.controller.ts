import { NextFunction, Request, Response } from "express";
import { IRecipe } from "../models/recipe.model";
import { getById, updateOneById, deleteOneById, getAll ,createOne} from "../services/recipe.service";
import { successResponse } from "../helpers/apiResponse.helper";
import { describe } from "node:test";

// Create a new recipe
export const createRecipe = async (req: Request, res: Response,next:NextFunction) => {
  const {
    title,
    preparationTime,
    cookingTime,
    description,
    servings,
    chef = req.id,
    category,
    ingredients, 
    steps, 
    media,
    comments = []
      }:IRecipe = req.body;
  

  try {




    const recipe:Partial<IRecipe> = {
      title,
      description,
      preparationTime,
      cookingTime,
      servings,
      chef,
      category,
      ingredients, 
      steps, 
      comments,
      media  }

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
    // res.json({newRecipe:recipe})
    const savedRecipe = await createOne(recipe)
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
