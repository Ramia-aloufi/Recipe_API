import { Router } from 'express';
import { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe } from '../controllers/recipe.controller';
import { isLoggedIn } from '../middleware/auth.middleware';

export const recipeRouter = Router();

recipeRouter.post('/', isLoggedIn, createRecipe);
recipeRouter.get('/', getAllRecipes);
recipeRouter.get('/:id', getRecipeById);
recipeRouter.put('/:id',isLoggedIn, updateRecipe);
recipeRouter.delete('/:id',isLoggedIn, deleteRecipe);
