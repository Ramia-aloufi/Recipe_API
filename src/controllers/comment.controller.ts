import { NextFunction, Request, Response } from 'express';
import { createOne, getById, updateOneById, deleteOneById, getAll } from '../services/comment.service';
import { successResponse } from '../helpers/apiResponse.helper';
import { IComment } from '../models/comment.model';
import { addComment, removeComment } from '../services/recipe.service';

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const newComment = {
            user:req.id,
            recipe:req.body.recipe,
            commentText:req.body.text
        }
        const comment = await createOne(newComment)
       await addComment(newComment.recipe,comment._id as string)
        successResponse<IComment>(res, {
            message: "Comment Created successfully.",
            statusCode: 200,
            data: comment,
        })
    } catch (error) {
        next(error)
    }
}

export const getCommentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await getById(req.params.id)
        successResponse<IComment>(res, {
            message: "Comment Retrieved successfully.",
            statusCode: 200,
            data: comment,
        })

    } catch (error) {
        next(error)
    }
}

export const getAllComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comments = await getAll();
        successResponse<IComment[]>(res, {
            message: "Comment Retrieved successfully.",
            statusCode: 200,
            data: comments,
        })
    } catch (error) {
        next(error)
    }
}

export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newComment = req.body.text
        
        const comment = await updateOneById(req.params.id,newComment);
        successResponse<IComment>(res, {
            message: "Comment Updated successfully.",
            statusCode: 200,
            data: comment,
        })
    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const comment = await deleteOneById(req.params.id);
        await removeComment(req.body.recipe,req.params.id)
        successResponse<IComment>(res, {
            message: "Comment Deleted successfully.",
            statusCode: 200,
            data: comment,
        })

    } catch (error) {
        next(error)
    }
}

