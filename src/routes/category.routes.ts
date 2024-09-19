import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controllers/category.controller';
import { isAdmin, isLoggedIn } from '../middleware/auth.middleware';

export const categoryRouter = Router();

categoryRouter.post('/',isLoggedIn,isAdmin, createCategory);
categoryRouter.get('/', getAllCategories);
categoryRouter.get('/:id', getCategoryById);
categoryRouter.put('/:id',isLoggedIn,isAdmin, updateCategory);
categoryRouter.delete('/:id',isLoggedIn,isAdmin, deleteCategory);
