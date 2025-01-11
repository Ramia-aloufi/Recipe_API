import { Router } from 'express';
import { updateUser, deleteUser, addUser, getAll, getUserData, getUser, adminOnly, getUserByName, follow } from '../controllers/user.controller';
import { isAdmin, isLoggedIn } from '../middleware/auth.middleware';
import upload from '../middleware/uploud.middlewre';
import { updatedUserIMG, uploadUserIMG, uploudIMG } from '../middleware/uploudImage.middleware';

export const userRouter = Router();

userRouter.post('/', addUser);
userRouter.post('/new',upload.single('profileImage'),uploadUserIMG, addUser);
userRouter.get('/all',isLoggedIn,isAdmin, getAll);
userRouter.get('/one/:id',isLoggedIn, getUser);
userRouter.get('/profile',isLoggedIn, getUserData);
userRouter.put('/one',upload.single('profileImage'),updatedUserIMG,isLoggedIn, updateUser);
userRouter.delete('/one/:id',isLoggedIn,isAdmin, deleteUser);
userRouter.get('/view/:name', getUserByName);
userRouter.put('/follow/:name',isLoggedIn, follow);
userRouter.put('/unfollow/:name',isLoggedIn, follow);
userRouter.get('/admin-only',isLoggedIn,isAdmin,adminOnly);