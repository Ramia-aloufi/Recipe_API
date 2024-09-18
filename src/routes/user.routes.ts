import { Router } from 'express';
import { updateUser, deleteUser, addUser, getAll } from '../controllers/user.controller';
import { getById } from '../repositories/category.repository';

export const userRouter = Router();

userRouter.post('/', addUser);
userRouter.get('/', getAll);
userRouter.get('/:id', getById);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);
