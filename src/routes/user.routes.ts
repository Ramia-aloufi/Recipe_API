import { Router } from 'express';
import { updateUser, deleteUser, addUser, getAll, getUserData } from '../controllers/user.controller';
import { getById } from '../services/category.service';
import { isAdmin, isLoggedIn } from '../middleware/auth.middleware';

export const userRouter = Router();

userRouter.post('/', addUser);
userRouter.get('/',isLoggedIn,isAdmin, getAll);
userRouter.get('/:id',isLoggedIn, getById);
userRouter.get('/profile',isLoggedIn, getUserData);
userRouter.put('/:id',isLoggedIn, updateUser);
userRouter.delete('/:id',isLoggedIn,isAdmin, deleteUser);
