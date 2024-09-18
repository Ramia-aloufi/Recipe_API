import { Router } from 'express';
import { createComment, getAllComments, getCommentById, updateComment, deleteComment } from '../controllers/comment.controller';

export const commentRouter = Router();

commentRouter.post('/', createComment);
commentRouter.get('/', getAllComments);
commentRouter.get('/:id', getCommentById);
commentRouter.put('/:id', updateComment);
commentRouter.delete('/:id', deleteComment);
