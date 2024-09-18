import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../helpers/apiResponse.helper';
import { createOne, getById, deleteOneById, updateOneById, getAll } from '../repositories/category.repository';

export const createCategory = async(req: Request, res: Response)=> {
        try {
            const category = await createOne(req.body);
            res.status(201).json(category);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }     
           }
    }

    export const getCategoryById= async(req: Request, res: Response)=>{
        try {
            const category = await getById(req.params.id) ;
            if (category) {
                successResponse(res,"",category)
            } else {
                errorResponse(res,'Category not found',undefined,404)
            }
        } catch (error) {
            if (error instanceof Error) {
                errorResponse(res, error.message,undefined,404)
            } else {
                errorResponse(res, 'An unknown error occurred',undefined,500)

            }        }
    }

    export const getAllCategories = async(req: Request, res: Response)=>{
        try {
            const categories = await getAll();
            res.json(categories);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }

    export const updateCategory = async (req: Request, res: Response) =>{
        try {
            const category = await updateOneById(req.params.id, req.body);
            if (category) {
                res.json(category);
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }

    export const deleteCategory = async(req: Request, res: Response) =>{
        try {
            const category = await deleteOneById(req.params.id);
            if (category) {
                res.json({ message: 'Category deleted successfully' });
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }

