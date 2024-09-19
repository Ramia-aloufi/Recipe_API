import { Request, Response } from "express";
import { Recipe } from "../models/recipe.model";
import { getById, updateOneById, deleteOneById, getAll } from "../repositories/category.repository";
import { CustomRequest } from "../types/customRequest.type";

// Create a new recipe
export const createRecipe = async (req: CustomRequest, res: Response) => {
  console.log('Request body:', req.body);
  
  try {
    const {
      title,
      preparationTime,
      cookingTime,
      servings,
      chef = req.id,
      category,
      media, 
      ingredients, 
      steps, 
      comments = []
        } = req.body;

    const newRecipe = new Recipe({
      title,
      preparationTime,
      cookingTime,
      servings,
      chef,
      category,
      media,
      ingredients,
      steps,
      comments
    });
    const savedRecipe = await newRecipe.save();
    res.status(201).json({ success: true, data: savedRecipe });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }  }
}

export const getRecipeById = async (req: Request, res: Response) => {
  try {

    const recipe = await getById(req.params.id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await getAll();
    res.json(recipes);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const updateRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await updateOneById(req.params.id, req.body);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await deleteOneById(req.params.id);
    if (recipe) {
      res.json({ message: "Recipe deleted successfully" });
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
