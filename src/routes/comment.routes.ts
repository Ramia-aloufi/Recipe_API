import { Router } from 'express';
import { createComment, getAllComments, getCommentById, updateComment, deleteComment } from '../controllers/comment.controller';
import { isLoggedIn } from '../middleware/auth.middleware';

export const commentRouter = Router();

commentRouter.post('/',isLoggedIn, createComment);
commentRouter.get('/', getAllComments);
commentRouter.get('/:id',isLoggedIn, getCommentById);
commentRouter.put('/:id',isLoggedIn, updateComment);
commentRouter.delete('/:id',isLoggedIn, deleteComment);
