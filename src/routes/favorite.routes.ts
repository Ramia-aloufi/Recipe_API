import { Router } from 'express';
import { createFavorite, getAllFavorites, getFavoriteById, updateFavorite, deleteFavorite } from '../controllers/favorite.controller';
import { isLoggedIn } from '../middleware/auth.middleware';

export const favoriteRouter = Router();

favoriteRouter.post('/',isLoggedIn, createFavorite);
favoriteRouter.get('/', getAllFavorites);
favoriteRouter.get('/:id', getFavoriteById);
favoriteRouter.put('/:id', updateFavorite);
favoriteRouter.delete('/:id', deleteFavorite);
