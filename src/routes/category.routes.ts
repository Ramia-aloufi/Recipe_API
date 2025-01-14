import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controllers/category.controller';
import { isAdmin, isLoggedIn } from '../middleware/auth.middleware';

export const categoryRouter = Router()

// POST /categories/id
categoryRouter.post('/',isLoggedIn,isAdmin, createCategory)
// GET /categories
categoryRouter.get('/', getAllCategories)
// GET /categories/id
categoryRouter.get('/:id', getCategoryById)
// PUT /categories/id
categoryRouter.put('/:id',isLoggedIn,isAdmin, updateCategory)
// DELETE /categories/id
categoryRouter.delete('/:id',isLoggedIn,isAdmin, deleteCategory)
