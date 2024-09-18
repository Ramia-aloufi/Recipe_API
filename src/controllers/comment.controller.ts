import { Request, Response } from 'express';
import { createOne, getById, updateOneById, deleteOneById, getAll } from '../repositories/category.repository';

export const createComment = async(req: Request, res: Response) => {
        try {
            const comment = await createOne(req.body);
            res.status(201).json(comment);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }        }
    }

    export const getCommentById = async (req: Request, res: Response)=> {
        try {
            const comment = await getById(req.params.id);
            if (comment) {
                res.json(comment);
            } else {
                res.status(404).json({ message: 'Comment not found' });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }        }
    }

    export const getAllComments = async(req: Request, res: Response)=> {
        try {
            const comments = await getAll();
            res.json(comments);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }        }
    }

    export const updateComment =  async(req: Request, res: Response)=>{
        try {
            const comment = await updateOneById(req.params.id, req.body);
            if (comment) {
                res.json(comment);
            } else {
                res.status(404).json({ message: 'Comment not found' });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }        }
    }

    export const deleteComment = async(req: Request, res: Response)=> {
        try {
            const comment = await deleteOneById(req.params.id);
            if (comment) {
                res.json({ message: 'Comment deleted successfully' });
            } else {
                res.status(404).json({ message: 'Comment not found' });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }        }
    }

