import { Router } from 'express';
import { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe } from '../controllers/recipe.controller';
import { isLoggedIn } from '../middleware/auth.middleware';
import upload from '../middleware/uploud.middlewre';
import { updatedIMG, uploudIMG } from '../middleware/uploudImage.middleware';

export const recipeRouter = Router();
// POST /recipes
recipeRouter.post('/', isLoggedIn,upload.single('media'),uploudIMG, createRecipe);
// GET /recipes
recipeRouter.get('/', getAllRecipes);
// GET /recipes/id
recipeRouter.get('/:id', getRecipeById);
// PUT /recipes/id
recipeRouter.put('/:id',isLoggedIn,upload.single('media'),updatedIMG, updateRecipe);
// DELETE /recipes/id
recipeRouter.delete('/:id',isLoggedIn, deleteRecipe);
