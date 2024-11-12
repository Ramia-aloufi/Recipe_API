import { NextFunction, Request, Response } from "express";
import { IRecipe } from "../models/recipe.model";
import { getById, updateOneById, deleteOneById, getAll ,createOne, getTotal} from "../services/recipe.service";
import { successResponse } from "../helpers/apiResponse.helper";
import { deleteImageFromCloudinary } from "../helpers/handleImag";

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
    const page = parseInt(req.query.page  as string) || 1 ;
    const pageSize = 10
    const recipes = await getAll(page,pageSize);
    const recipesTotal = await getTotal();
    successResponse<IRecipe[]>(res,{
      message:"Recipe Retrieved successfully.",
      statusCode:200,
      data:recipes,
      meta:{
        page:page,
        pageSize:pageSize,
        total:recipesTotal,
        totalPages: recipesTotal / pageSize
      }
  })  
 } catch (error) {
  next(error)
  }
}

export const updateRecipe = async (req: Request, res: Response ,next:NextFunction) => {
  try {
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
        const data:Partial<IRecipe> = {
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

    const recipe = await updateOneById(req.params.id, data);
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
    const data =  await getById(req.params.id);
    await deleteImageFromCloudinary(data.title)
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
