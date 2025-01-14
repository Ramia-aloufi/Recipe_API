import { Router } from 'express';
import { createComment, getAllComments, getCommentById, updateComment, deleteComment } from '../controllers/comment.controller';
import { isLoggedIn } from '../middleware/auth.middleware';

export const commentRouter = Router();
// POST /comments
commentRouter.post('/',isLoggedIn, createComment);
// GET /comments
commentRouter.get('/', getAllComments);
// GET /comments/id
commentRouter.get('/:id',isLoggedIn, getCommentById);
// PUT /comments/id
commentRouter.put('/:id',isLoggedIn, updateComment);
// DELETE /comments/id
commentRouter.delete('/:id',isLoggedIn, deleteComment);
