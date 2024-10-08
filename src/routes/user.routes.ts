import { Router } from 'express';
import { updateUser, deleteUser, addUser, getAll, getUserData, getUser } from '../controllers/user.controller';
import { isAdmin, isLoggedIn } from '../middleware/auth.middleware';

export const userRouter = Router();

userRouter.post('/', addUser);
userRouter.get('/all',isLoggedIn,isAdmin, getAll);
userRouter.get('/one/:id',isLoggedIn, getUser);
userRouter.get('/profile',isLoggedIn, getUserData);
userRouter.put('/one/:id',isLoggedIn, updateUser);
userRouter.delete('/one/:id',isLoggedIn,isAdmin, deleteUser);
