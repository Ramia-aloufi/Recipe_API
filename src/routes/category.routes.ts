import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controllers/category.controller';

export const categoryRouter = Router();

categoryRouter.post('/', createCategory);
categoryRouter.get('/', getAllCategories);
categoryRouter.get('/:id', getCategoryById);
categoryRouter.put('/:id', updateCategory);
categoryRouter.delete('/:id', deleteCategory);
