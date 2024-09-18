import { Router } from 'express';
import { createFavorite, getAllFavorites, getFavoriteById, updateFavorite, deleteFavorite } from '../controllers/favorite.controller';

export const favoriteRouter = Router();

favoriteRouter.post('/', createFavorite);
favoriteRouter.get('/', getAllFavorites);
favoriteRouter.get('/:id', getFavoriteById);
favoriteRouter.put('/:id', updateFavorite);
favoriteRouter.delete('/:id', deleteFavorite);
