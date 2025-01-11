import { Router } from 'express';
// import { createFavorite, deleteFavorite } from '../controllers/favorite.controller';
import { isLoggedIn } from '../middleware/auth.middleware';

export const favoriteRouter = Router();

// favoriteRouter.post('/',isLoggedIn, createFavorite);
// favoriteRouter.delete('/:id',isLoggedIn, deleteFavorite);
