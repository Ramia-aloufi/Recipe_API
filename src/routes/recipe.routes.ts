import { Router } from 'express';
import { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe } from '../controllers/recipe.controller';

export const recipeRouter = Router();

recipeRouter.post('/', createRecipe);
recipeRouter.get('/', getAllRecipes);
recipeRouter.get('/:id', getRecipeById);
recipeRouter.put('/:id', updateRecipe);
recipeRouter.delete('/:id', deleteRecipe);
