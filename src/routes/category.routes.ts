import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controllers/category.controller';
import { isAdmin, isLoggedIn } from '../middleware/auth.middleware';

export const categoryRouter = Router()

// POST /recipes/5
categoryRouter.post('/',isLoggedIn,isAdmin, createCategory)
// GET /recipes
categoryRouter.get('/', getAllCategories)
// GET /recipes/5
categoryRouter.get('/:id', getCategoryById)
// PUT /recipes/5
categoryRouter.put('/:id',isLoggedIn,isAdmin, updateCategory)
// DELETE /recipes/5
categoryRouter.delete('/:id',isLoggedIn,isAdmin, deleteCategory)
