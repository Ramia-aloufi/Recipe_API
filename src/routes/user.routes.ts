import { Router } from 'express';
import { updateUser, deleteUser, addUser, getAll, getUserData, getUser, adminOnly, getUserByName, follow } from '../controllers/user.controller';
import { isAdmin, isLoggedIn } from '../middleware/auth.middleware';
import upload from '../middleware/uploud.middlewre';
import { updatedUserIMG, uploadUserIMG, uploudIMG } from '../middleware/uploudImage.middleware';

export const userRouter = Router();
// POST /users
userRouter.post('/', addUser);
// POST /users/new
userRouter.post('/new',upload.single('profileImage'),uploadUserIMG, addUser);
// GET /users/all
userRouter.get('/all',isLoggedIn,isAdmin, getAll);
// GET /users/one/id
userRouter.get('/one/:id',isLoggedIn, getUser);
// GET /users/profile
userRouter.get('/profile',isLoggedIn, getUserData);
// PUT /users/one
userRouter.put('/one',upload.single('profileImage'),updatedUserIMG,isLoggedIn, updateUser);
// DELETE /users/one/id
userRouter.delete('/one/:id',isLoggedIn,isAdmin, deleteUser);
// GET /users/view/name
userRouter.get('/view/:name', getUserByName);
// PUT /users/follow/name
userRouter.put('/follow/:name',isLoggedIn, follow);
// GET /users/admin-only
userRouter.get('/admin-only',isLoggedIn,isAdmin,adminOnly);