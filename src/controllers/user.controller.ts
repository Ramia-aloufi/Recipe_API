import { NextFunction, Request, Response } from "express";
import { createUser, getUserById, getAllUsers, updateUserById, deleteUserById, addFavorite } from "../services/user.service";
import bcrypt from "bcrypt"
import { IUser } from "../models/user.model";
import { successResponse } from "../helpers/apiResponse.helper";

export const addUser = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const newUser = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(newUser.password, salt)
    
    const user = await createUser({...newUser,password:hashedPass});
    successResponse<IUser>(res,{
      message:"User Created successfully.",
      statusCode:201,
      data:user
  }) 
  } catch (error) {
    next(error)
  }
};
export const getUser = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const user = await getUserById(req.params.id);
    successResponse<IUser>(res,{
      message:"User Retrieved successfully.",
      statusCode:200,
      data:user
  }) 
  } catch (error) {
    next(error)

  }
};
export const adminOnly = async (req: Request, res: Response,next:NextFunction) => {
    successResponse<boolean>(res,{
      message:"User Retrieved successfully.",
      statusCode:200,
      data:true
  }) 

};
export const getUserData = async (req: Request, res: Response,next:NextFunction) => {
  try {

    const user = await getUserById(req.id);

    successResponse<object>(res,{
      message:"User Retrieved successfully.",
      statusCode:200,
      data: user
    }) 
  } catch (error) {
    next(error)
  }
};
export const getAll = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const users = await getAllUsers();
    successResponse<IUser[]>(res,{
      message:"Users Retrieved successfully.",
      statusCode:200,
      data:users
  }) 
  } catch (error) {
    next(error)
  }
};
export const updateUser = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const user = await updateUserById(req.params.id, req.body);
    successResponse<IUser>(res,{
      message:"User Updated successfully.",
      statusCode:200,
      data:user
  }) 
  } catch (error) {
    next(error)

  }
};
export const addUserFavorite = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const data = {
      user:req.id,
      recipe:req.body.recipe
    }
     await addFavorite(data.user,  data.recipe);
    successResponse<null>(res, {
      message: "Favorite Created successfully.",
      statusCode: 201,
      data: null,
  })
  } catch (error) {
    next(error)
  }
};
export const deleteUser = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const user = await deleteUserById(req.params.id);
    successResponse<IUser>(res,{
      message:"User deleted successfully.",
      statusCode:200,
      data:user
  }) 

  } catch (error) {
    next(error)

  }
};
